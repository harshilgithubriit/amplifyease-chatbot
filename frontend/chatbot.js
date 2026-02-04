const toggleBtn = document.createElement("button");
toggleBtn.id = "chatbot-toggle";
toggleBtn.innerText = "💬";

const chatWindow = document.createElement("div");
chatWindow.id = "chatbot-window";

chatWindow.innerHTML = `
    <div id="chatbot-header">AmplifyBot 🤖</div>
    <div id="chatbot-messages"></div>
    <div id="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="Type here..." />
        <button id="send-btn">Send</button>
    </div>
    <div id="chatbot-footer">Powered by AmplifyEase</div>
`;

document.body.appendChild(toggleBtn);
document.body.appendChild(chatWindow);

toggleBtn.onclick = () => {
    chatWindow.style.display =
        chatWindow.style.display === "flex" ? "none" : "flex";
    input.focus();
};

let step = 0;
let context = "";
let userData = {};
const messagesDiv = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("send-btn");

function time() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "bot-message";
    div.innerHTML = `${text}<span class="time">${time()}</span>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "user-message";
    div.innerHTML = `${text}<span class="time">${time()}</span>`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTyping() {
    const div = document.createElement("div");
    div.id = "typing";
    div.className = "typing";
    div.innerHTML = "● ● ●";
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
}

function showQuickReplies() {
    const div = document.createElement("div");
    div.className = "quick-replies";
    div.innerHTML = `
        <button onclick="handleQuickReply('Pricing')">Pricing</button>
        <button onclick="handleQuickReply('Support')">Support</button>
        <button onclick="handleQuickReply('Book Demo')">Book Demo</button>
    `;
    messagesDiv.appendChild(div);
}

setTimeout(() => {
    addBotMessage(
        `👋 Hi! I can help you with:<br>
        • Pricing information<br>
        • Support questions<br>
        • Booking a demo<br><br>
        Choose an option below to get started.`
    );
    showQuickReplies();
    step = 1;
}, 500);

window.handleQuickReply = function (choice) {
    context = choice;
    addUserMessage(choice);
    showTyping();
    setTimeout(() => {
        removeTyping();
        if (choice === "Pricing") addBotMessage("I’ll help you with pricing. First, may I know your name?");
        if (choice === "Support") addBotMessage("Let me assist you with support. What’s your name?");
        if (choice === "Book Demo") addBotMessage("I’ll collect details to book a demo. What’s your name?");
        step = 2;
    }, 700);
};

sendBtn.onclick = handleInput;
input.addEventListener("keypress", e => {
    if (e.key === "Enter") handleInput();
});

function handleInput() {
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = "";

    if (step === 2) {
        userData.name = text;
        showTyping();
        setTimeout(() => {
            removeTyping();
            addBotMessage("Please enter your email address.");
            step = 3;
        }, 600);
    }

    else if (step === 3) {
        if (!text.includes("@") || !text.includes(".")) {
            addBotMessage("That doesn’t look like a valid email. Could you re-enter it?");
            return;
        }
        userData.email = text;
        showTyping();
        setTimeout(() => {
            removeTyping();
            addBotMessage("Please briefly describe your query.");
            step = 4;
        }, 600);
    }

    else if (step === 4) {
        userData.query = text;
        addBotMessage(
            `Here’s what I’ve got:<br>
            <b>Name:</b> ${userData.name}<br>
            <b>Email:</b> ${userData.email}<br>
            <b>Query:</b> ${userData.query}<br><br>
            Type <b>YES</b> to submit or <b>NO</b> to edit.`
        );
        step = 5;
    }

    else if (step === 5) {
        if (text.toLowerCase() === "yes") {
            showTyping();
            fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
            .then(res => res.json())
            .then(data => {
                removeTyping();
                addBotMessage(data.reply);
                addBotMessage(`<button onclick="restartChat()">Start New Conversation</button>`);
                input.disabled = true;
                sendBtn.disabled = true;
            });
        } else {
            addBotMessage("No problem. Let’s start again. What’s your name?");
            step = 2;
        }
    }
}

window.restartChat = function () {
    messagesDiv.innerHTML = "";
    input.disabled = false;
    sendBtn.disabled = false;
    step = 0;
    userData = {};
    setTimeout(() => {
        addBotMessage(
            `👋 Hi! I can help you with:<br>
            • Pricing information<br>
            • Support questions<br>
            • Booking a demo`
        );
        showQuickReplies();
        step = 1;
    }, 400);
};
