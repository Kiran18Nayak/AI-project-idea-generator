async function generateProjects() {
  const skills = [...document.querySelectorAll("input:checked")]
    .map(cb => cb.value);

  if (skills.length === 0) {
    alert("Select at least one skill");
    return;
  }

  const results = document.getElementById("results");
  results.innerText = "Generating AI-powered project ideas...";

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skills })
  });

  const data = await response.json();
  results.innerText = data.result;
}
// const projects = [
//     {
//         name: "To-Do List Web App",
//         skills: ["html", "css", "javascript"],
//         difficulty: "Beginner",
//         description: "A simple web app to add, delete and manage daily tasks."
//     },
//     {
//         name: "Student Management System",
//         skills: ["html", "css", "javascript", "php", "mysql"],
//         difficulty: "Intermediate",
//         description: "Manage student records, marks, and attendance."
//     },
//     {
//         name: "AI Resume Screening Tool",
//         skills: ["python", "machine learning", "nlp"],
//         difficulty: "Intermediate",
//         description: "Automatically analyze resumes and rank candidates."
//     },
//     {
//         name: "Chat Application",
//         skills: ["javascript", "nodejs"],
//         difficulty: "Advanced",
//         description: "Real-time chat app using WebSockets."
//     }
// ];
// async function generateProjects() {
//   const skills = [...document.querySelectorAll("input:checked")]
//     .map(cb => cb.value);

//   const res = await fetch("/api/generate", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ skills })
//   });

//   const data = await res.json();
//   document.getElementById("results").innerHTML =
//     `<pre>${data.result}</pre>`;
// }

// // function generateProjects() {
// //     const selectedSkills = [];
// //     document.querySelectorAll('input[type="checkbox"]:checked')
// //         .forEach(cb => selectedSkills.push(cb.value));

// //     const resultsDiv = document.getElementById("results");
// //     resultsDiv.innerHTML = "";

// //     let found = false;

// //     projects.forEach(project => {
// //         let matchCount = project.skills.filter(skill =>
// //             selectedSkills.includes(skill)
// //         ).length;

// //         let matchPercentage = (matchCount / project.skills.length) * 100;

// //         if (matchPercentage >= 50) {
// //             found = true;
// //             resultsDiv.innerHTML += `
// //                 <div class="project-card">
// //                     <h3>${project.name}</h3>
// //                     <p>${project.description}</p>
// //                     <p class="difficulty">Difficulty: ${project.difficulty}</p>
// //                     <p><strong>Required Skills:</strong> ${project.skills.join(", ")}</p>
// //                 </div>
// //             `;
// //         }
// //     });

// //     if (!found) {
// //         resultsDiv.innerHTML = "<p>No matching projects found. Try selecting more skills.</p>";
// //     }
// // }
