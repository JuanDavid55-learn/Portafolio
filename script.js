// ──── MOBILE MENU ────
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// ──── SCROLL REVEAL ────
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

sections.forEach(section => observer.observe(section));

// ──── THEME TOGGLE ────
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
}

// ──── PROJECTS ────
// Emoji mapping by keywords in title or tech (fallback to 💻)
function getProjectEmoji(project) {
  if (project.emoji) return project.emoji;
  const text = (project.title + " " + project.tech).toLowerCase();
  if (text.includes("spring") || text.includes("api")) return "🌱";
  if (text.includes("mysql") || text.includes("base de datos") || text.includes("database")) return "🗄️";
  if (text.includes("web") || text.includes("html") || text.includes("frontend")) return "🌐";
  if (text.includes("java")) return "☕";
  if (text.includes("python")) return "🐍";
  if (text.includes("node")) return "🟩";
  if (text.includes("mongo")) return "🍃";
  if (text.includes("n8n") || text.includes("automat")) return "⚙️";
  return "💻";
}

fetch("data/projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("projects-container");

    projects.forEach(project => {
      const techList = project.tech
        ? project.tech.split(",").map(t => `<span class="tech-chip">${t.trim()}</span>`).join("")
        : "";

      const emoji = getProjectEmoji(project);

      container.innerHTML += `
        <div class="project-card">
          <div class="project-card-top">
            <span class="project-emoji">${emoji}</span>
            <a href="${project.github}" target="_blank" class="project-link" aria-label="Ver ${project.title} en GitHub">GitHub →</a>
          </div>
          <h4>${project.title}</h4>
          <p>${project.description}</p>
          <div class="project-tech-chips">${techList}</div>
        </div>
      `;
    });
  })
  .catch(() => {
    // Fallback si no hay archivo projects.json
    const container = document.getElementById("projects-container");
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">Los proyectos se cargan desde <code>data/projects.json</code>.</p>`;
  });