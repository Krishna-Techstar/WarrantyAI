# WarrantyAI Repository Guidelines & Rules

## 🚨 Golden Rule: Real Data Only — Zero Mock Data & Zero Assumptions

1. **NO Mock Data or Simulated Results:**
   - Never fabricate, hardcode, or simulate AI outputs, agent responses, or claim adjudications in operational test/runner scripts.
   - All executions must process actual input files and send them through the real RocketRide pipeline / live APIs.

2. **No Unwarranted Assumptions:**
   - Do not guess or extrapolate unverified facts about inputs, API behavior, or decisions.
   - If information or requirements are missing, halt or prompt the user.

3. **Fail Loudly & Explicitly:**
   - If an API key is invalid, revoked, missing, or if a network/pipeline error occurs, the code must **fail immediately**.
   - Output clear, prominent error messages detailing the exact issue.
   - Exit with a non-zero exit code (`sys.exit(1)`).
   - Under **NO** circumstance should an error handler fall back to simulated or synthetic data.
