📌 AmplifyEase – Embeddable Chatbot Widget

A lightweight, embeddable chatbot widget designed to be integrated into any website.
The chatbot provides predefined responses, collects basic user information, and demonstrates a clean UI/UX with simple interaction design.

This project was built as part of the Software Engineer Skill Evaluation Assignment for AmplifyEase.

🚀 Features

Floating chatbot widget (bottom-right corner)

Embeddable into any website using simple CSS & JS

Step-based conversational flow

Predefined quick reply buttons:

Pricing

Support

Book Demo

Collects user details:

Name

Email

Query

Clean and responsive UI

Optional Flask backend integration

Easy to extend with database or CRM integration

🛠️ Tech Stack
Frontend (Primary Focus)

HTML

CSS

JavaScript (Vanilla)

Backend (Optional / Bonus)

Python

Flask

Flask-CORS

📂 Project Structure
amplifyease-chatbot/
│
├── frontend/
│   ├── index.html        
│   ├── chatbot.css     
│   ├── chatbot.js     
│
├── backend/
│   ├── app.py            
│   ├── requirements.txt 
│
├── README.md

⚙️ How to Run the Project
1️⃣ Run the Backend (Optional)

Navigate to the backend folder:

cd backend
pip install -r requirements.txt
python app.py


Backend will run at:

http://127.0.0.1:5000

2️⃣ Run the Frontend

Open the following file in any browser:

frontend/index.html


No server is required for frontend — it works directly in the browser.

🔗 How the Chatbot Works

User opens the chatbot widget

Bot greets the user and shows predefined options

User selects an option (Pricing / Support / Book Demo)

Bot collects:

Name

Email

Query

Data is sent to the Flask backend via a POST API

Backend logs the data and sends a confirmation response

🔌 API Endpoint (Backend)
POST /chat

Request Body (JSON):

{
  "name": "User Name",
  "email": "user@email.com",
  "query": "User query text"
}


Response:

{
  "reply": "Thank you! Our team will reach out to you soon."
}

🌍 Embedding the Chatbot in Any Website

To embed this chatbot into any website:

<link rel="stylesheet" href="chatbot.css">
<script src="chatbot.js"></script>


The chatbot will automatically appear as a floating widget.


🔮 Future Enhancements

Database integration (MySQL / MongoDB)

Admin dashboard for viewing conversations

AI-based responses

Authentication & session handling

Improved animations and UI transitions

👤 Author

Harshil Mishra
Software Engineer Intern Applicant
Project built for AmplifyEase skill evaluation

