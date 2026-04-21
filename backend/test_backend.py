import subprocess
import time
import httpx
import os

os.environ["DASHSCOPE_API_KEY"] = "sk-5b24bf408a994217bcdc301940deb85e"
os.environ["DEMO_REBUILD_SCHEMA_ON_STARTUP"] = "true"
os.environ["DEMO_RESET_ON_STARTUP"] = "true"

proc = subprocess.Popen(
    ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"],
    cwd=os.path.dirname(os.path.abspath(__file__))
)

print("Waiting for server...")
time.sleep(8)

try:
    resp = httpx.get("http://localhost:8000/health")
    print("Health:", resp.json())

    resp = httpx.get("http://localhost:8000/api/sellers", follow_redirects=True)
    sellers = resp.json().get("sellers", [])
    print(f"Sellers: {len(sellers)}")

    if sellers:
        sid = sellers[0]["id"]
        print(f"Testing /api/loans/score/{sid}...")
        resp = httpx.post(f"http://localhost:8000/api/loans/score/{sid}", follow_redirects=True)
        print("Score response:", resp.status_code)
        print("Body:", resp.text[:800])
except Exception as e:
    print("Error:", e)
finally:
    proc.terminate()