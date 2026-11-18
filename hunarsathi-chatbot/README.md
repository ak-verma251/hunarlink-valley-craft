# HunarSathi — HunarLink Buyer Chatbot (LangChain + Gemini 3.8 Flash)

**HunarSathi** is the dedicated AI buyer assistant embedded on the HunarLink main page. It uses **LangChain** (`langchain-google-genai`) calling Google's **`gemini-3.8-flash`** model via `GEMINI_API_KEY` loaded from `.env`, and strictly answers **only HunarLink platform questions**.

## Setup & Run

1. **Add your Gemini API key** in `hunarsathi-chatbot/.env`:
   ```env
   GEMINI_API_KEY=your_real_google_gemini_api_key
   GEMINI_MODEL=gemini-3.8-flash
   PORT=5050
   ```

2. **Install Python dependencies**:
   ```bash
   cd hunarsathi-chatbot
   pip install -r requirements.txt
   ```

3. **Start the HunarSathi API server** (connects directly to the **HunarSathi** widget on the main page):
   ```bash
   python server.py
   ```
   Or test directly in your terminal:
   ```bash
   python cli_chat.py
   ```

