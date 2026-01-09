export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { skills } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{
      parts: [{ text: `Generate 3 project ideas for: ${skills.join(", ")}` }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    // Gemini's direct response structure is slightly different
    const aiText = data.candidates[0].content.parts[0].text;
    
    return res.status(200).json({ result: aiText });
  } catch (error) {
    console.error("Direct Gemini Error:", error);
    return res.status(500).json({ error: error.message });
  }
}