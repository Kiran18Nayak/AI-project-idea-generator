import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  // This URL is specifically designed for the OpenAI SDK wrapper
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { skills } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash", // Most reliable free-tier model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Generate 3 project ideas for: ${skills.join(", ")}` }
      ],
      // Note: Gemini does not support 'user' tags in some wrapper versions; 
      // keeping it simple ensures compatibility.
    });

    return res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("Gemini Error:", error);
    // This will now pass the actual Google error message to your Vercel logs
    return res.status(500).json({ error: error.message || "AI generation failed" });
  }
}