function updateData() {
  const temp = Math.floor(Math.random() * 16) + 20;      // 20–35°C
  const humidity = Math.floor(Math.random() * 61) + 30;  // 30–90%
  const lightOptions = ["Low", "Moderate", "High"];
  const light = lightOptions[Math.floor(Math.random() * 3)];
  const soil = Math.floor(Math.random() * 51) + 20;       // 20–70%
  const co2 = Math.floor(Math.random() * 251) + 300;      // 300–550 ppm
  const ph = (Math.random() * 2 + 5.5).toFixed(1);         // 5.5–7.5

  document.getElementById("tempVal").textContent = `${temp}°C`;
  document.getElementById("humidityVal").textContent = `${humidity}%`;
  document.getElementById("lightVal").textContent = light;
  document.getElementById("soilVal").textContent = `${soil}%`;
  document.getElementById("co2Val").textContent = `${co2} ppm`;
  document.getElementById("phVal").textContent = ph;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  const loadingMsg = appendMessage("bot", "🤖 Thinking...");
  try {
    const response = await fetch('https://kushi29.app.n8n.cloud/webhook/185fca6a-02d0-45a6-a900-21150ce2dcbd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status} - ${response.statusText}`);
    }

    const text = await response.text(); // Get raw response
    console.log("Raw response from website:", text); // Log for debugging
    let cleanedText = text.replace(/```json\n|```/g, '').trim(); // Remove markdown
    let data;
    try {
      data = cleanedText ? JSON.parse(cleanedText) : {};
    } catch (e) {
      console.error("JSON Parse Error:", e.message, "Cleaned response:", cleanedText);
      throw new Error("Invalid JSON response from webhook");
    }
    const reply = data.reply || "🤖 Sorry, I couldn’t process that. Try again!";
    loadingMsg.textContent = reply;
  } catch (error) {
    console.error("Fetch Error:", error.message);
    loadingMsg.textContent = `🤖 Error: ${error.message}`;
  }
}

function appendMessage(sender, text) {
  const chatbox = document.getElementById("chatbox");
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${sender}`;
  msgDiv.textContent = text;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
  return msgDiv;
}
  