import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

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
    return {"message": "DormBuddy backend is up and running with Groq!"}

@app.post("/chat")
async def chat_with_groq(req: MessageRequest):
    system_prompt = system_messages.get(req.personality, system_messages["roomie"])

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": req.message}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=payload
        )

    if response.status_code != 200:
        return {"error": response.text}

    data = response.json()
    return {"reply": data["choices"][0]["message"]["content"]}