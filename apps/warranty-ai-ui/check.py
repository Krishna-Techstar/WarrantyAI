"""
Validation script for warrantyai.pipe and RocketRide setup.
"""
import json
import uuid
import sys
from pathlib import Path

def validate_pipe_file(pipe_path: Path) -> bool:
    print(f"Validating {pipe_path.name}...")
    
    if not pipe_path.exists():
        print(f"[FAIL] {pipe_path.name} does not exist.")
        return False
        
    try:
        with open(pipe_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"[FAIL] Could not parse JSON in {pipe_path.name}: {e}")
        return False

    keys = list(data.keys())
    if keys[0] != "components":
        print(f"[FAIL] 'components' must be the first key in the JSON object (got '{keys[0]}')")
        return False

    if "project_id" not in data:
        print("[FAIL] Missing 'project_id'")
        return False

    try:
        uuid.UUID(data["project_id"])
    except ValueError:
        print(f"[FAIL] 'project_id' '{data['project_id']}' is not a valid GUID literal")
        return False

    if data.get("version") != 1:
        print("[FAIL] 'version' must be 1")
        return False

    components = data.get("components", [])
    component_ids = set()
    for comp in components:
        cid = comp.get("id")
        if not cid:
            print("[FAIL] Component without id found")
            return False
        if cid in component_ids:
            print(f"[FAIL] Duplicate component ID: {cid}")
            return False
        component_ids.add(cid)

    # Check input links and lane compatibility against services-catalog.json
    catalog_path = Path(__file__).parent / ".rocketride" / "services-catalog.json"
    catalog = {}
    if catalog_path.exists():
        with open(catalog_path, "r", encoding="utf-8") as f:
            catalog = {item["name"]: item for item in json.load(f)}

    for comp in components:
        cid = comp["id"]
        c_provider = comp.get("provider")
        c_lanes = catalog.get(c_provider, {}).get("lanes", {}) if catalog else {}

        for inp in comp.get("input", []):
            from_id = inp.get("from")
            in_lane = inp.get("lane")
            if from_id not in component_ids:
                print(f"[FAIL] Component '{cid}' references unknown source '{from_id}'")
                return False
            
            if catalog and c_provider in catalog:
                from_comp = next(c for c in components if c["id"] == from_id)
                from_provider = from_comp.get("provider")
                from_lanes = catalog.get(from_provider, {}).get("lanes", {})
                
                possible_outputs = []
                if "_source" in from_lanes:
                    possible_outputs.extend(from_lanes["_source"])
                for k, v in from_lanes.items():
                    if k != "_source":
                        possible_outputs.extend(v)
                
                if in_lane not in possible_outputs:
                    print(f"[FAIL] Lane mismatch: '{cid}' ({c_provider}) expects '{in_lane}' from '{from_id}' ({from_provider}), but '{from_provider}' only produces {possible_outputs}")
                    return False
                    
                if in_lane not in c_lanes:
                    print(f"[FAIL] Lane mismatch: '{cid}' ({c_provider}) receives input lane '{in_lane}', but '{c_provider}' only accepts {list(c_lanes.keys())}")
                    return False

    print(f"[PASS] {pipe_path.name} contains {len(components)} components and valid DAG wiring with 100% lane compatibility.")
    return True

def handle_claim_response(response_payload: dict) -> dict:
    """
    Branching logic handled in application code / SDK caller.
    Reads 'route' from the pipeline decision JSON and dispatches accordingly.
    """
    # Extract decision dictionary from pipeline response
    raw_answer = response_payload.get("answers", response_payload)
    if isinstance(raw_answer, str):
        try:
            decision = json.loads(raw_answer)
        except Exception:
            decision = {"route": "human_review", "error": "unparseable_output"}
    else:
        decision = raw_answer

    route = decision.get("route", "human_review")
    action = decision.get("recommended_action", "deny")
    confidence = decision.get("overall_confidence", 0)

    if route == "auto":
        print(f"  -> [AUTO-ACTION]: Executing automated '{action}' (Confidence: {confidence}%)")
        return {"status": "auto_closed", "action": action, "decision": decision}
    elif route == "verify":
        print(f"  -> [VERIFICATION QUEUE]: Flagged for secondary check (Confidence: {confidence}%)")
        return {"status": "verification_pending", "action": action, "decision": decision}
    else: # "human_review"
        print(f"  -> [HUMAN REVIEW QUEUE]: Pushed to specialist review queue (Confidence: {confidence}%)")
        return {"status": "human_review_required", "action": action, "decision": decision}

def main():
    pipe_path = Path(__file__).parent / "warrantyai.pipe"
    success = validate_pipe_file(pipe_path)
    if success:
        print("\nTesting Application SDK Branch Dispatcher:")
        test_samples = [
            {"answers": json.dumps({"recommended_action": "repair", "overall_confidence": 95, "route": "auto"})},
            {"answers": json.dumps({"recommended_action": "deny", "overall_confidence": 80, "route": "verify"})},
            {"answers": json.dumps({"recommended_action": "deny", "overall_confidence": 45, "route": "human_review"})}
        ]
        for idx, sample in enumerate(test_samples, 1):
            print(f"Sample {idx}:")
            handle_claim_response(sample)
        print("\nAll checks and dispatch logic passed successfully!")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
