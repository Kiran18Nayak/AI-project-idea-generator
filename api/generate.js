import OpenAI from "openai";

// Change 1: Update the configuration to point to Google's servers
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY, // Use your new Gemini key
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/" // Point to Google
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { skills } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash", // Change 2: Use a Gemini model name
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Generate 3 project ideas for: ${skills.join(", ")}` }
      ],
    });

    res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message || "AI generation failed" });
  }
}