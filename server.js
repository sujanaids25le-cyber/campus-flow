require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;

// health check
app.get("/", (req, res) => {
  res.send("🚀 AI API is running");
});

app.post("/analyze", async (req, res) => {
  try {
    // DEBUG: see what n8n/postman sends
    console.log("BODY RECEIVED:", req.body);

    // fallback to avoid crash
    const notice =
      req.body?.notice || "Submit AI assignment tomorrow at 5PM";

    const prompt = `
Extract structured JSON strictly in this format:
{
"title": "",
"deadline_date": "YYYY-MM-DD",
"deadline_time": "HH:MM",
"priority": ""
}
Return ONLY JSON. No explanation. No markdown.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: notice }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let output = response.data.choices[0].message.content;

    console.log("\nRAW AI OUTPUT:\n", output);

    // 🔥 CLEAN AI RESPONSE (handles ```json)
    output = output.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(output);
    } catch (parseError) {
      console.log("❌ JSON PARSE ERROR:", parseError.message);

      return res.status(500).json({
        error: "Invalid JSON from AI",
        raw_output: output
      });
    }

    res.json(parsed);
  } catch (err) {
    console.log("\n❌ ERROR OCCURRED\n");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () => {
  console.log("🚀 AI API running on http://localhost:3000");
});