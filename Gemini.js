const btn = document.getElementById("btn");
const output = document.getElementById("output");

btn.addEventListener("click", getQuestion);

async function getQuestion() {
  const topic = document.getElementById("topic").value.trim();

  if (!topic) {
    output.innerHTML = "⚠️ Please enter a topic";
    return;
  }

  output.innerHTML = "⏳ Loading...";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAJDKHssjWjkOtcRg1DlhukiRXtBDXFxj0`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give one simple question and answer about ${topic}. Format: Question: ... Answer: ...`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    if (data.error) {
      output.innerHTML = "❌ " + data.error.message;
      return;
    }

    const text = data.candidates[0].content.parts[0].text;
    console.log(data);

    output.innerHTML = `<p>${text}</p>`;

  } catch (err) {
    output.innerHTML = "❌ Network error";
  }
}