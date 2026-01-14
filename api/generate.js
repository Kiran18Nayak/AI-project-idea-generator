export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { skills } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  // Groq uses an OpenAI-compatible URL structure
  const url = "https://api.groq.com/openai/v1/chat/completions";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // This is a powerful, free Groq model
        // Inside your generate.js handler:
        messages: [
          { role: "system", content: "You are a software architect. Generate project ideas in a strict format." },
          { 
            role: "user", 
            content: `Suggest 3 projects for someone with: ${skills.join(", ")}. 
            Use this EXACT format for each:
            ### [Project Name]
            **Description:** [One line]
            **Features:**
            * [Feature A]
            * [Feature B]
            **Difficulty Level:** [Beginner/Intermediate/Advanced]` 
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    // This path is safer than your previous one
    const aiContent = data.choices?.[0]?.message?.content || "No ideas generated.";
    
    return res.status(200).json({ result: aiContent });

  } catch (error) {
    console.error("Deployment Error:", error);
    return res.status(500).json({ error: "Failed to connect to the AI provider." });
  }
}