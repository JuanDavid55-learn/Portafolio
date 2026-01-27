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

const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
}

fetch("data/projects.json")
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById("projects-container");

    projects.forEach(project => {
      container.innerHTML += `
        <div class="project-card">
          <h4>${project.title}</h4>
          <br>
          <p>${project.description}</p>
          <br>
          <p class="tech">${project.tech}</p>
          <br>
          <a href="${project.github}" target="_blank">Ver en GitHub →</a>
        </div>
      `;
    });
  });