# DormBuddy

DormBuddy is an AI-powered college assistant web app with fun personalities to help you with academics, life advice, and emotional support.

## Live Demo

- **Frontend:** [DormBuddy on Netlify](https://your-netlify-site.netlify.app)
- **Backend API:** [DormBuddy API on Render](https://your-render-backend-url.onrender.com)

## Features

- **Three AI personalities:**
  - **Professor:** Academic help, clear explanations
  - **Therapist:** Emotional support, kind advice
  - **Roomie:** Casual, friendly, Gen Z-coded advice

- **Modern UI:**
  - Responsive, clean design using Tailwind CSS
  - Animated chat bubbles and mode selector

- **FastAPI backend:**
  - Integrates with Groq LLM API
  - Personality-based system prompts

## Getting Started

### 1. Backend Setup

1. Install dependencies:
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

2. Set up `.env`:
    ```
    GROQ_API_KEY=your_groq_api_key_here
    ```
3. Run the backend:
    ```sh
    uvicorn main:app --reload
    ```

### 2. Frontend Setup

The frontend is a static HTML file using CDN scripts.
Open `frontend/index.html` in your browser, or serve it with any static server.

### 3. Usage

- Select a personality and start chatting!
- The backend will respond using the selected AI persona.

## API

- `POST /chat`
  Request JSON:
  ```json
  {
    "message": "Your question",
    "personality": "roomie" | "professor" | "therapist"
    }
  ```
  Response JSON:
  ```json
  {
    "reply": "AI response"
  }
  ```

## Project Structure

```
frontend/
  index.html           # Main web UI
backend/
  main.py              # FastAPI backend
  requirements.txt     # Python dependencies
  .env                 # Environment variables (GROQ_API_KEY)
```


## License

MIT © 2025 Keerthana A R
