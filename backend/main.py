import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY") # Deprecated, keeping for safety if rollback needed, but essentially unused now.

app = FastAPI()

# Allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str
    personality: str = "roomie"

system_messages = {
    "professor": "You are DormBuddy, a highly knowledgeable professor who explains things clearly and helps students succeed academically.",
    "roomie": "You are DormBuddy, a chill and funny college roommate who gives advice like a best friend and always has your back.",
    "therapist": "You are DormBuddy, a calm and empathetic therapist who helps students deal with stress, motivation, and emotional issues with kindness and support."
}


@app.get("/")
def root():
    return {"message": "DormBuddy backend is up and running with OpenRouter!"}

@app.post("/chat")
async def chat_with_ai(req: MessageRequest):
    system_prompt = system_messages.get(req.personality, system_messages["roomie"])

    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    
    # Debug: Check API Key presence
    if not OPENROUTER_API_KEY:
        print("Error: OPENROUTER_API_KEY is missing")
        return {"error": "Server configuration error: API key missing"}

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:5500", # Specific to local testing
        "X-Title": "DormBuddy Local",
        "Content-Type": "application/json"
    }

    
    payload = {
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": req.message}
        ]
    }
    
    # List of free models to try in order of preference
    # Verified available as of 2026-01-30
    models_to_try = [
        "arcee-ai/trinity-large-preview:free", # User requested top priority
        "google/gemma-3-12b-it:free", # New & Strong
        "meta-llama/llama-3.3-70b-instruct:free", # High intelligence
        "mistralai/mistral-small-3.1-24b-instruct:free", 
        "meta-llama/llama-3.2-3b-instruct:free", # Fast
        "qwen/qwen-2.5-vl-7b-instruct:free",
        "nousresearch/hermes-3-llama-3.1-405b:free", # Very large, might be slow/busy
        "google/gemma-3-4b-it:free"
    ]

    last_error = None
    
    print(f"Starting model fallback loop. Trying {len(models_to_try)} models.")

    async with httpx.AsyncClient() as client:
        for model in models_to_try:
            print(f"Attempting model: {model}")
            
            payload["model"] = model
            
            try:
                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=20.0 # shorter timeout for retries
                )
                
                if response.status_code == 200:
                     print(f"SUCCESS with model: {model}")
                     data = response.json()
                     if "choices" in data and len(data["choices"]) > 0:
                         return {"reply": data["choices"][0]["message"]["content"]}
                else:
                    print(f"Failed {model}: {response.status_code} - {response.text}")
                    last_error = f"Error {response.status_code} with {model}"

            except Exception as e:
                print(f"Exception with {model}: {str(e)}")
                last_error = str(e)
                continue

    # If we get here, all models failed
    print("All models failed.")
    return {"error": f"All free models failed. Last error: {last_error}. Please check OpenRouter status or credit."}