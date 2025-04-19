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
  
  function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;
  
    appendMessage("user", message);
    input.value = "";
  
    let reply = "🤖 Sorry, I’m not sure about that. Try asking about watering, pH, temperature, etc.";
  
    const msg = message.toLowerCase();
    if (msg.includes("water") || msg.includes("watering")) {
      reply = "💧 Water early morning or late evening. Ensure 40–60% soil moisture.";
    } else if (msg.includes("fertilizer")) {
      reply = "🧪 Use organic compost every 2–3 weeks for healthy growth.";
    } else if (msg.includes("temperature")) {
      reply = "🌡️ Ideal temp range: 22–30°C for most crops.";
    } else if (msg.includes("ph")) {
      reply = "🧪 pH should stay between 5.5 and 7.5 for best results.";
    } else if (msg.includes("humidity")) {
      reply = "💦 Maintain humidity between 50% and 70% in greenhouses.";
  
    }
  
    setTimeout(() => appendMessage("bot", reply), 700);
  }
  
  function appendMessage(sender, text) {
    const chatbox = document.getElementById("chatbox");
    const msgDiv = document.createElement("div");
    msgDiv.className = `msg ${sender}`;
    msgDiv.textContent = text;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
  