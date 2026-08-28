"""
Live execution test runner for WarrantyAI Pipeline using the RocketRide SDK with Groq LLMs.
Processes real claim files/payloads through the live 5-agent DAG pipeline.
Fails loudly with non-zero exit code (1) if the pipeline call fails.
"""
import sys
import os
import json
import uuid
import asyncio
import argparse
from pathlib import Path
from rocketride import RocketRideClient

DEFAULT_BILL = Path(__file__).parent / "samples" / "sample_bill.png"
DEFAULT_DAMAGE = Path(__file__).parent / "samples" / "sample_damage.png"

def parse_args():
    parser = argparse.ArgumentParser(description="Test WarrantyAI live pipeline with Groq.")
    parser.add_argument("--invoice", "-i", type=str, default=str(DEFAULT_BILL), help="Path to invoice image")
    parser.add_argument("--damage", "-d", type=str, default=str(DEFAULT_DAMAGE), help="Path to damage image")
    parser.add_argument("--product", "-p", type=str, default="Evidson Audio X55i In-Ear Earphones with Mic (Black)", help="Product name")
    parser.add_argument("--date", type=str, default="2018-10-06", help="Purchase date (YYYY-MM-DD)")
    parser.add_argument("--price", type=float, default=549.0, help="Purchase price")
    parser.add_argument("--description", "-t", type=str, default="bill defected product issue is the earphone is broken from earplugs", help="Customer issue description")
    return parser.parse_args()

async def run_live_claim(invoice_path: str, damage_path: str, product_name: str, purchase_date: str, price: float, description: str):
    pipe_file = Path(__file__).parent / "warrantyai.pipe"
    
    if not pipe_file.exists():
        print(f"\n[ERROR] Pipeline file not found at {pipe_file}")
        sys.exit(1)

    p_inv = Path(invoice_path)
    p_dmg = Path(damage_path)
    cid = f"CLM-{uuid.uuid4().hex[:8].upper()}"

    print("=" * 70)
    print("      WARRANTYAI LIVE PIPELINE EXECUTION (GROQ + ROCKETRIDE)")
    print("=" * 70)
    print(f" [+] Generated Claim ID:     {cid}")
    print(f" [+] Product Name:           {product_name}")
    print(f" [+] Purchase Date:          {purchase_date}")
    print(f" [+] Attached Invoice Image: {p_inv.resolve()} (Exists: {p_inv.exists()})")
    print(f" [+] Attached Damage Image:  {p_dmg.resolve()} (Exists: {p_dmg.exists()})")
    print(f" [+] Customer Description:   \"{description}\"")
    print("-" * 70)

    try:
        print("\n[1/3] Connecting to RocketRide server...")
        async with RocketRideClient() as client:
            print("      [+] Connected and authenticated with RocketRide server.")
            
            print("[2/3] Loading and starting pipeline from warrantyai.pipe...")
            with open(pipe_file, "r", encoding="utf-8") as f:
                pipe_raw = f.read()

            for key, val in client._env.items():
                if key.startswith("ROCKETRIDE_"):
                    pipe_raw = pipe_raw.replace(f"${{{key}}}", val)

            pipeline_config = json.loads(pipe_raw)
            pipeline_config["project_id"] = str(uuid.uuid4())
            
            result = await client.use(pipeline=pipeline_config, source="webhook_intake")
            token = result.get("token")
            if not token:
                raise RuntimeError(f"Pipeline started but no task token returned: {result}")
            print(f"      [+] Pipeline active with Task Token: {token}")

            # Send dynamic claim payload
            print("[3/3] Sending real claim payload to 5-Agent pipeline on Groq...")
            claim_text = (
                f"Claim ID: {cid}\n"
                f"Product Name: {product_name}\n"
                f"Purchase Date: {purchase_date}\n"
                f"Purchase Price: {price} INR\n"
                f"Document Evidence: Invoice image attached at {p_inv.name} for {product_name}, purchase date {purchase_date}.\n"
                f"Visual Damage Evidence: Damage photo attached at {p_dmg.name}.\n"
                f"Customer Issue Statement: {description}"
            )

            decision_response = await client.send(
                token=token,
                data=claim_text,
                mimetype="text/plain"
            )

            print("\n" + "=" * 70)
            print("         LIVE PIPELINE ADJUDICATION RESULT (REAL GROQ DATA)")
            print("=" * 70)
            print(json.dumps(decision_response, indent=2))
            print("=" * 70)

    except Exception as e:
        print("\n" + "=" * 70)
        print("!! PIPELINE CALL FAILED -- NO REAL DATA RETURNED -- CHECK CONFIG !!")
        print("=" * 70)
        print(f"Error Details: {e}")
        print("\nChecklist to fix:")
        print(" 1. Verify ROCKETRIDE_APIKEY in your .env file is active and valid.")
        print(" 2. Verify ROCKETRIDE_GROQ_KEY in your .env file.")
        print(" 3. Verify ROCKETRIDE_URI in your .env file (default: https://api.rocketride.ai).")
        print("=" * 70)
        sys.exit(1)

def main():
    args = parse_args()
    asyncio.run(run_live_claim(args.invoice, args.damage, args.product, args.date, args.price, args.description))

if __name__ == "__main__":
    main()
