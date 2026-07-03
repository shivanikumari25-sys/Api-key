const API_KEY = "AIzaSyC101YUNB1WRoBWBKoyWz7C1QnZydYWsqY";
const output = document.getElementById("output");
async function callGemini(prompt) {
  try {
    output.innerText = "⏳ Loading...";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );
    const data = await response.json();
console.log(data);
    if (!data.candidates) {
      output.innerText =
        "❌ Error: API response failed";
      return;
    }
    const text =
      data.candidates[0].content.parts[0].text;
    output.innerText = text;
  } catch (error) {
    output.innerText =
      "❌ Error: " + error.message;
  }
}
function askAI() {
  const input =
    document.getElementById("input").value;
  callGemini(input);
}
function summarizeText() {
  const input =
    document.getElementById("input").value;
  callGemini(`Summarize this text:\n${input}`);
}
function generateIdeas() {
  const input =
    document.getElementById("input").value;
  callGemini(`Give me creative ideas about:\n${input}`);
}
function findDefinition() {
  const input =
    document.getElementById("input").value;
  callGemini(`Define and explain:\n${input}`);
}