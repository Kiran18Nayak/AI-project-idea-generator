import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  // FIX: Remove the trailing /openai/ from the URL
  baseURL: "https://generativelanguage.googleapis.com/v1beta" 
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { skills } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash", // Ensure this matches a valid Google model ID
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Generate 3 project ideas for: ${skills.join(", ")}` }
      ],
    });

    return res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: error.message || "AI generation failed" });
  }
}