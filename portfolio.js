(function () {
  const grid = document.getElementById("portfolio-grid");
  const empty = document.getElementById("portfolio-empty");
  const filters = Array.from(document.querySelectorAll(".portfolio-filter"));
  const projects = Array.isArray(window.SINAPSE_PROJECTS) ? window.SINAPSE_PROJECTS : [];
  const owners = {
    giulia: "Giulia Gavriletea",
    iulia: "Iulia Florea",
    collab: "Sinapse în colaborare"
  };
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function render(filter) {
    const selected = filter === "all" ? projects : projects.filter(project => project.owner === filter);
    grid.replaceChildren();
    empty.hidden = selected.length > 0;
    grid.hidden = selected.length === 0;
    selected.forEach((project) => {
      const article = make("article", "project-card");
      const cover = make("div", "project-cover");
      cover.style.background = project.coverBackground || "linear-gradient(135deg,#e8dce8,#f8f0e9)";
      if (project.cover) {
        const img = make("img");
        img.src = project.cover;
        img.alt = project.title ? "Imagine din proiectul " + project.title : "Imagine de proiect";
        img.loading = "lazy";
        img.onerror = () => img.remove();
        cover.append(img);
      }
      cover.append(make("span", "project-cover-mark", project.mark || "S."));
      cover.append(make("span", "project-cover-tag", project.category || "Proiect creativ"));
      article.append(cover);
      const details = make("div", "project-details");
      const meta = make("div", "project-meta");
      meta.append(make("span", "", project.client || owners[project.owner] || "SINAPSE MEDIA"));
      meta.append(make("span", "", (project.year || "") + (project.owner ? " · " + owners[project.owner] : "")));
      details.append(meta);
      details.append(make("h3", "", project.title || "Proiect SINAPSE MEDIA"));
      details.append(make("p", "", project.description || ""));
      if (Array.isArray(project.tags) && project.tags.length) {
        const tags = make("div", "project-tags");
        project.tags.forEach(tag => tags.append(make("span", "", tag)));
        details.append(tags);
      }
      article.append(details);
      grid.append(article);
    });
  }
  filters.forEach((button) => button.addEventListener("click", () => {
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    render(button.dataset.filter);
    if (projects.length === 0 && button.dataset.filter !== "all") {
      const copy = empty.querySelector(".empty-copy");
      copy.textContent = button.dataset.filter === "giulia"
        ? "Aici vor apărea proiectele semnate de Giulia Gavriletea."
        : button.dataset.filter === "iulia"
          ? "Aici vor apărea proiectele semnate de Iulia Florea."
          : "Aici vor apărea proiectele dezvoltate în colaborare.";
    } else if (projects.length === 0) {
      empty.querySelector(".empty-copy").textContent = "Structura portofoliului este pregătită. Aici vom adăuga proiectele tale și ale Iuliei, cu imagini, descrierea contribuției și detaliile relevante pentru fiecare colaborare.";
    }
  }));
  const count = document.querySelector('.portfolio-filter[data-filter="all"] span');
  if (count) count.textContent = String(projects.length).padStart(2, "0");
  render("all");
})();