// const OpenAI = require("openai");
import OpenAI from "openai";
    // import dotenv from "dotenv";
    // dotenv.config();

const api = import.meta.env.VITE_OPENAI_API_KEY;


const openai = new OpenAI({
  apiKey: api,
  dangerouslyAllowBrowser: true,
});

export async function sendMesageAndGetResponse(message) {
  const completion = await openai.chat.completions.create({
    messages: message,
    model: "gpt-3.5-turbo",
  });

  const response = await completion.choices[0].message.content;
  return response;
}
