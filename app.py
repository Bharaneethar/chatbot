import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Gemini API
# 1. Try to load from environment variable (preferred)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# 2. MANUAL FALLBACK (Only use if .env is not working)
# If the above fails, you can paste your key here temporarily:
# GEMINI_API_KEY = "PASTE_YOUR_KEY_HERE"

if GEMINI_API_KEY and GEMINI_API_KEY != "PASTE_YOUR_KEY_HERE":
    genai.configure(api_key=GEMINI_API_KEY)
    # Using 'gemini-flash-latest' which is available in your environment
    model = genai.GenerativeModel('gemini-flash-latest')
else:
    print("WARNING: GEMINI_API_KEY not found or not configured.")
    model = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    if not model:
        return jsonify({"error": "Gemini API key not configured"}), 500
    
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        if not model:
            return jsonify({"error": "Gemini API key is not set. Please create a .env file with GEMINI_API_KEY."}), 500
        
        response = model.generate_content(user_message)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": f"API Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
