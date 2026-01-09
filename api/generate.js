import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const { skills } = req.body;

  const prompt = `
Generate 3 creative software project ideas based on these skills:
${skills.join(", ")}

For each project provide:
- Project Title
- One-line Description
- Difficulty Level
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8
    });

    res.status(200).json({
      result: response.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ error: "AI generation failed" });
  }
}
