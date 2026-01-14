async function generateProjects() {
  const skills = [...document.querySelectorAll("input:checked")].map(cb => cb.value);

  if (skills.length === 0) {
    alert("Select at least one skill");
    return;
  }

  const results = document.getElementById("results");
  results.innerHTML = "<p>Generating AI-powered project ideas...</p>";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills })
    });

    const data = await response.json();
    
    // Simple formatter to convert Markdown to Project Cards
    const formattedHtml = data.result
      .replace(/^### (.*$)/gim, '<div class="project-card"><h3>$1</h3>') // Title
      .replace(/\*\*Description:\*\*/g, '<strong>Description:</strong>') 
      .replace(/\*\*Difficulty Level:\*\* (.*)/g, '<span class="difficulty-badge">$1</span></div>') 
      .replace(/\*\*Features:\*\*/g, '<strong>Features:</strong><ul class="features-list">')
      .replace(/^\* (.*$)/gim, '<li>$1</li>') // Bullets to LI
      .replace(/<\/li>\n(?!<li>)/g, '</li></ul>'); // Close lists

    results.innerHTML = formattedHtml;

  } catch (error) {
    results.innerHTML = "<p style='color:red;'>Failed to generate projects. Try again.</p>";
  }
}