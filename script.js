const config = window.SITE_CONFIG;

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
};

document.title = `${config.name} - 个人主页`;
setText("profile-name", config.name);
setText("profile-handle", config.handle);
setText("profile-bio", config.bio);
setText("profile-location", config.location);
setText("profile-role", config.role);
setText("avatar", config.initials);
setText("intro-text", config.intro);
setText("footer-name", config.name);
setText("year", new Date().getFullYear());

document.getElementById("all-projects-link").href = config.github;

document.getElementById("social-links").innerHTML = config.socials
  .map(
    (social) =>
      `<a href="${social.url}" target="_blank" rel="noreferrer" aria-label="${social.label}" title="${social.label}">${social.short}</a>`,
  )
  .join("");

document.getElementById("project-grid").innerHTML = config.projects
  .map(
    (project) => `
      <a class="project-card" href="${project.url}" target="_blank" rel="noreferrer">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-meta">
          <span><i style="background:${project.color}"></i>${project.language}</span>
          <span>☆ ${project.stars}</span>
        </div>
      </a>`,
  )
  .join("");

const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.dataset.theme = "dark";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = isDark ? "light" : "dark";
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
