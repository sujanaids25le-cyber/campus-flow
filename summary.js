const fs = require("fs");
const axios = require("axios");

const API_KEY = "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";

async function run() {

  const notice = fs.readFileSync("sample.txt", "utf8");
  const prompt = fs.readFileSync("prompt.txt", "utf8");

  const res = await axios.post(
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

  const output = res.data.choices[0].message.content;

  console.log("\n====== AI OUTPUT ======\n");
  console.log(output);
}

run();