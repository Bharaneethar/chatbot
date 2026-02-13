# ✨ Antigravity Chatbot

A modern, visually stunning chatbot website with a playful "Anti-Gravity" UI. Powered by Flask and Google Gemini AI.

![Antigravity UI Mockup](https://raw.githubusercontent.com/your-username/chatbot/main/screenshot.png) <!-- Replace with actual screenshot link later -->

## 🚀 Features

- **Premium UI**: Glassmorphism design with smooth floating animations.
- **Dynamic Background**: Interactive star-field that twinkles and moves.
- **Real-time Chat**: Powered by Google Gemini 1.5 Flash (via `gemini-flash-latest`).
- **Responsive**: Works on desktop and mobile browsers.

## 🛠️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/chatbot.git
   cd chatbot
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure API Key**:
   Create a `.env` file in the root directory and add your key:
   ```text
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the application**:
   ```bash
   python app.py
   ```
   Open `http://127.0.0.1:5000` in your browser.

## 📁 Project Structure

- `app.py`: Flask backend and Gemini integration.
- `templates/`: HTML structure.
- `static/`: CSS styling and JavaScript logic.
- `.env`: (Ignored) Your secret API key.
- `requirements.txt`: Python dependencies.

## 📜 License

MIT License. Feel free to use and modify!
