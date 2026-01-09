import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { skills } = req.body;
  if (!skills || !Array.isArray(skills)) {
    return res.status(400).json({ error: "Skills are required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Generate 3 project ideas for: ${skills.join(", ")}` }
      ],
    });

    return res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return res.status(500).json({ error: error.message || "AI generation failed" });
  }
}