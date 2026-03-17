require("dotenv").config();

const fs = require("fs");
const axios = require("axios");

const API_KEY = process.env.API_KEY;

async function run() {

  try {

    // read files
    const notice = fs.readFileSync("sample.txt", "utf8");
    const prompt = fs.readFileSync("prompt.txt", "utf8");

    // call AI
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

    console.log("\n=========== AI OUTPUT ===========\n");
    console.log(output);
    console.log("\n=================================\n");

  } catch (err) {

    console.log("\n❌ ERROR OCCURRED\n");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

  }

}

run();