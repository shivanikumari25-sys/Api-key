const affirmationText = document.getElementById("affirmation");
const btn = document.getElementById("btn");
const API_KEY = "AIzaSyAqj7sg132oPahpPYv6DoMK1rzMkCd0hdM";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
const getAffirmation = async () => {
  try {
    affirmationText.textContent = "Fetching your daily positivity... ✨";
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Give me a short one-line positive affirmation." }
            ]
          }
        ]
      })
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    affirmationText.textContent =
      result || "You are strong, confident, and capable 💪";
  } catch (error) {
    console.error(error);
    affirmationText.textContent =
      "Failed to load affirmation 😢";
  }
};
window.addEventListener("DOMContentLoaded", getAffirmation);
btn.addEventListener("click", getAffirmation);
