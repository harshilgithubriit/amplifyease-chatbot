from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend requests

# Health check route
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "AmplifyEase Chatbot Backend is running"
    })


# Chat endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    query = data.get("query")

    # You can store this in DB later (optional)
    print("New Chat Submission:")
    print("Name:", name)
    print("Email:", email)
    print("Query:", query)

    return jsonify({
        "reply": f"Thank you {name}! Our team will reach out to you soon."
    })


if __name__ == "__main__":
    app.run(debug=True)
