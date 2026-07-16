const config = window.SITE_CONFIG;

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
};

document.title = `${config.name} - 个人主页`;
setText("brand-name", config.handle.replace("@", "").toUpperCase());
setText("profile-name", config.name);
setText("profile-handle", config.handle);
setText("profile-bio", config.bio);
setText("profile-location", config.location);
setText("profile-role", config.role);
setText("avatar", config.initials);
setText("intro-text", config.intro);
setText("stat-projects", config.stats.projects);
setText("stat-years", config.stats.years);
setText("stat-notes", config.stats.notes);
setText("footer-name", config.name);
setText("year", new Date().getFullYear());
setText("contact-email", config.email);

const emailHref = `mailto:${config.email}`;
document.getElementById("email-link").href = emailHref;
document.getElementById("contact-email").href = emailHref;
document.getElementById("github-main-link").href = config.github;
document.getElementById("all-projects-link").href = config.github;

document.getElementById("social-links").innerHTML = config.socials
  .map(
    (social) =>
      `<a href="${social.url}" target="_blank" rel="noreferrer" aria-label="${social.label}" title="${social.label}">${social.short}</a>`,
  )
  .join("");

document.getElementById("project-grid").innerHTML = config.projects
  .map(
    (project, index) => `
      <a class="project-card ${project.featured ? "featured" : ""}" href="${project.url}" target="_blank" rel="noreferrer">
        <div class="project-topline">
          <span class="project-number">0${index + 1}</span>
          <span class="project-arrow">↗</span>
        </div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-meta">
          <span><i style="background:${project.color}"></i>${project.language}</span>
          <span>☆ ${project.stars}</span>
        </div>
      </a>`,
  )
  .join("");

document.getElementById("notes-list").innerHTML = config.notes
  .map(
    (note) => `
      <a class="note-row" href="${note.url}">
        <time>${note.date}</time>
        <h3>${note.title}</h3>
        <span class="note-tag">${note.tag}</span>
        <span class="note-arrow">↗</span>
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
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
