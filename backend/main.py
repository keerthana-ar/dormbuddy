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
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "DormBuddy backend is up and running with Groq!"}

@app.post("/chat")
async def chat_with_groq(req: MessageRequest):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": "You are DormBuddy, a chatbot that helps students with timetables, tasks, motivation, and social advice."},
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