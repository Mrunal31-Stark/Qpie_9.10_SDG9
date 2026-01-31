# 🚀 AI Patent Analyzer & Innovation Assistant

## 📖 Overview
**AI Patent Analyzer** is a cutting-edge SaaS platform designed to democratize patent intelligence. It allows inventors, startups, and researchers to instantly analyze their ideas against a database of existing patents. By leveraging advanced **Natural Language Processing (NLP)** and **Generative AI**, the tool provides deep insights into **patent novelty, infringement risks, and market trends**.

The platform features a **Glassmorphism UI** for a premium user experience and includes an interactive **AI Chatbot Mentor** to answer specific questions about the analysis.

---

## ✨ Key Features

### 🧠 Core AI Analysis
- **Similarity Search Engine**: Uses `all-MiniLM-L6-v2` embeddings to find the most semantically similar patents in the database.
- **Risk & Novelty Scoring**: Automatically calculates a "Duplicate Risk" score (High/Medium/Low) and a "Novelty %" based on vector distance.
- **Automated Summarization**: Uses **Groq (Llama-3)** to generate executive summaries of technical patent texts.
- **Smart Recommendations**: Provides tailored strategic advice (e.g., "Pivot to Niche", "FTO Search Needed") based on the analysis.

### 🤖 AI Chatbot Mentor
- **Context-Aware**: The chatbot knows the specific patent, risk score, and summary of the current analysis.
- **Interactive Q&A**: Users can ask follow-up questions like "How do I improve this?" or "Who are my competitors?".
- **Glassmorphism UI**: A beautiful, floating chat interface with modern blur effects.

### 📊 SaaS Dashboard & Trends
- **User Profiles & History**: Persistent accounts (MongoDB) to save and review past analyses.
- **Market Insights**: Visualizes top domains and yearwise trends for similar inventions.
- **PDF & Text Support**: Accepts raw text descriptions or PDF file uploads.

---

## 🏗 System Architecture

The project follows a **Hybrid Microservices Architecture**:

1.  **Frontend (React + Vite)**:
    -   Handles UI/UX, file uploads, and visualizations.
    -   Communicates with the Node.js BFF (Backend for Frontend).
2.  **Application Server (Node.js + Express)**:
    -   Manages **Authentication** (JWT) and **User Data** (MongoDB).
    -   Acts as a **Proxy** for the AI service.
    -   Stores Chat History and Analysis Logs.
3.  **AI Engine (Python + FastAPI)**:
    -   Loads the **Vector Database** (Embeddings).
    -   Performs **Semantic Search** (Cosine Similarity).
    -   Integrates with **Groq API** for LLM generation.
    -   Handles heavy data processing (Pandas/NumPy).
4.  **Database**:
    -   **MongoDB**: User profiles, chat logs, analysis history.
    -   **Parquet/CSV**: Static patent dataset and pre-computed embeddings.

---

## 🛠 Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Recharts, Framer Motion |
| **App Backend** | Node.js, Express, Mongoose, JWT |
| **AI Backend** | Python 3.12, FastAPI, Sentence-Transformers, Pandas, Groq SDK |
| **Database** | MongoDB (Atlas or Local), FAISS (Vector Search) |
| **DevOps** | Git, GitHub, Uvicorn, Concurrent execution |

---

## 📂 Directory Structure

### `backend/` (The AI Brain)
-   `api.py`: Main FastAPI entry point. Defines `/analyze` and `/chat` endpoints.
-   `similarity_engine.py`: Logic for computing vector similarity and ranking matches.
-   `summarizer.py`: Connects to Groq API for generating summaries and chat responses.
-   `recommender.py`: Rule-based + AI logic for business recommendations.
-   `query_embedder.py`: Handles text-to-vector conversion using HuggingFace models.
-   `data/`: Stores the dataset (`master_patents.csv`) and `step*_*.py` pipeline scripts.

### `frontend/` (The User Interface)
-   `src/pages/`:
    -   `AnalysisDashboard.jsx`: Main view displaying results, risk gauges, and trends.
    -   `Landing.jsx`, `Login.jsx`, `Profile.jsx`: SaaS user flow pages.
-   `src/components/`:
    -   `ChatBot.jsx`: The floating AI assistant component.
    -   `Navbar.jsx`: Responsive navigation with user dropdown.
-   `server/` (Node.js Middleware):
    -   `index.js`: Express server setup, API proxying, and DB connection.
    -   `models/`: Mongoose schemas for `User`, `History`, and `Chat`.

### `data/`
-   Contains the source patent data (CSV/Parquet) and generated embeddings.

---

## 🚀 Installation & Setup

### Prerequisites
-   **Node.js** (v16+)
-   **Python** (v3.10+)
-   **MongoDB** (Local or Atlas URL)
-   **Groq API Key** (for LLM features)

### 1. Clone the Repository
```bash
git clone https://github.com/YourRepo/AI-Patent-Analyzer.git
cd AI-Patent-Analyzer
```

### 2. Setup AI Backend (Python)
```bash
cd backend
python -m venv venv
# Activate Venv: `venv\Scripts\activate` (Win) or `source venv/bin/activate` (Mac/Linux)
pip install -r requirements.txt
```
*Create a `.env` file in `backend/`:*
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Setup Frontend & App Server (Node.js)
```bash
cd frontend
npm install
```
*Create a `.env` file in `frontend/`:*
```env
MONGO_URI=mongodb://localhost:27017/ai-patent-analyzer
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Running the Application
You need to run **two** terminals.

**Terminal 1: Python AI Server**
```bash
# From root dir
uvicorn backend.api:app --reload --port 8001
```

**Terminal 2: Frontend + Node Server**
```bash
# From frontend dir
npm run dev    # Starts Vite (UI)
npm run server # Starts Express (App Backend)
```
*(Note: `npm run dev` and `npm run server` might need separate terminals if not configured to run concurrently, but typically we run them side-by-side).*

---

## 🧠 Data Pipeline (How it works)

The `backend/` folder contains a series of **Step Scripts** (`step1` to `step6`) that process raw data:
1.  **Ingestion**: Reads raw patent CSVs.
2.  **Embedding**: Converts `abstract` text into 384-dimensional vectors using `all-MiniLM-L6-v2`.
3.  **Refinement**: Infers missing `Year` and `Domain` fields using keyword analysis.
4.  **Optimization**: Converts heavy CSVs into Parquet format for faster loading.
5.  **Verification**: Ensures ID formats and data integrity before launching the API.

---

## 🔗 API Reference

### Python AI API (`http://localhost:8001`)
-   `POST /analyze`: Accepts text, returns risk score, vectors matches, summary, and recommendations.
-   `POST /chat`: Accepts chat history + context, returns LLM response.

### Node.js App API (`http://localhost:5000`)
-   `POST /api/auth/register`: Create user account.
-   `POST /api/analyze`: Proxies request to Python backend + saves log.
-   `GET /api/history`: Returns user's past analyses.
-   `GET /api/chat-history`: Returns user's past chat sessions.

---

