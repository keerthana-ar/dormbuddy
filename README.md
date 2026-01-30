# DormBuddy 🎓

> **Your AI-powered college companion.**  
> A high-fidelity, Claude-like chat interface with 3 unique personalities designed to guide you through university life.

![DormBuddy UI](https://via.placeholder.com/800x450.png?text=DormBuddy+Interface)

## ✨ Features

- **Professional UI**: A pixel-perfect clone of modern chat interfaces (inspired by Claude.ai), featuring:
    - Warm, minimalist aesthetic (`#f7f7f5`).
    - Elegant typography (Merriweather for AI, Inter for UI).
    - Smooth streaming text effects.
- **3 Unique Personalities**:
    - 🍻 **Roomie**: Your chill best friend for life advice and venting.
    - 🎓 **Professor**: Academic expert for explanations and study tips.
    - 🌷 **Therapist**: Empathetic support for stress and motivation.
- **Robust AI Backend**:
    - Powered by **OpenRouter** (access to top-tier models).
    - **Smart Fallback System**: Automatically switches between models (Arcee Trinity, Gemma 3, Llama 3.3, etc.) to ensure *zero downtime* and *no 404 errors*.
- **Persistent History**:
    - Your chats are automatically saved to your browser.
    - Sidebar with "Recents" to jump back into past conversations instantly.

## 🚀 Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript, Tailwind CSS (via CDN).
- **Backend**: Python, FastAPI, HTTPX.
- **AI Provider**: OpenRouter API.

## 🛠️ Installation & Setup

### 1. Backend

The backend handles the connection to OpenRouter and manages the AI personalities.

```bash
# 1. Navigate to backend folder
cd backend

# 2. Create a virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt
```

**Configuration (`.env`):**
Create a `.env` file in the `backend` folder:
```env
OPENROUTER_API_KEY=your_key_here
```

**Run the Server:**
```bash
uvicorn main:app --reload
```
*Server runs at `http://127.0.0.1:8000`*

### 2. Frontend

The frontend is a lightweight static file. No build process required!

1.  Open `frontend/index.html` in your browser.
2.  (Optional) For a better experience, use a simple HTTP server:
    ```bash
    # In frontend folder
    python -m http.server 5500
    ```

## 💡 Usage

1.  **Select a Mode**: Click the icon above the chat input (🍻, 🎓, 🌷) to switch personalities.
2.  **Chat**: Type your message and hit Enter.
3.  **New Chat**: Click "New Chat" in the sidebar to start fresh.
4.  **History**: Click any item in the "Recents" list to load that conversation.

## 📄 License

MIT © 2026 Keerthana A R
