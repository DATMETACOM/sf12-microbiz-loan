import os, httpx, json
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv('DASHSCOPE_API_KEY')

print(f"API Key: {api_key[:15]}...")

payload = {
    "model": "qwen3-max",
    "messages": [{"role": "user", "content": 'Respond with JSON: {"status": "ok", "message": "Qwen API working"}'}],
    "max_tokens": 100,
    "temperature": 0.1
}

headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

try:
    resp = httpx.post("https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions", headers=headers, json=payload, timeout=30)
    print("Status:", resp.status_code)
    data = resp.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
    print("Response:", content)
except Exception as e:
    print("Error:", e)