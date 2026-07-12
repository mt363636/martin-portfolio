const header=document.querySelector(".header");
const menuToggle=document.querySelector(".menu-toggle");
const navLinksContainer=document.querySelector(".nav-links");
const navLinks=document.querySelectorAll(".nav-link");
const sections=document.querySelectorAll("main section[id]");
const reveals=document.querySelectorAll(".reveal");
const contactForm=document.querySelector("#contact-form");
const formStatus=document.querySelector("#form-status");
const year=document.querySelector("#year");
if(year) year.textContent=new Date().getFullYear();

const closeMenu = () => {
  if (!menuToggle || !navLinksContainer) return;

  menuToggle.classList.remove("active");
  navLinksContainer.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
};

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});
navLinks.forEach(link=>link.addEventListener("click",closeMenu));

window.addEventListener("scroll",()=>{
  if(header) header.classList.toggle("scrolled",window.scrollY>20);
  if(!sections.length)return;
  let current="home";
  sections.forEach(section=>{
    if(window.scrollY>=section.offsetTop-160) current=section.id;
  });
  navLinks.forEach(link=>{
    const href=link.getAttribute("href");
    if(href&&href.startsWith("#")) link.classList.toggle("active",href===`#${current}`);
  });
});

const observer=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
},{threshold:.12});
reveals.forEach(el=>observer.observe(el));


const cosmicCards = document.querySelectorAll(".project-card");

cosmicCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

const themeToggle = document.querySelector("#theme-toggle");
const themeFlight = document.querySelector(".theme-flight");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "cosmic") {
  document.body.classList.add("cosmic-theme");
  themeToggle?.setAttribute("aria-pressed", "true");
}

themeToggle?.addEventListener("click", () => {
  const switchingToCosmic =
    !document.body.classList.contains("cosmic-theme");

  themeFlight?.classList.remove("active");

  void themeFlight?.offsetWidth;

  themeFlight?.classList.add("active");

  window.setTimeout(() => {
    document.body.classList.toggle(
      "cosmic-theme",
      switchingToCosmic
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(switchingToCosmic)
    );

    localStorage.setItem(
      "portfolio-theme",
      switchingToCosmic ? "cosmic" : "light"
    );
  }, 430);

  window.setTimeout(() => {
    themeFlight?.classList.remove("active");
  }, 1200);
});

const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
  const updateBackToTopVisibility = () => {
    if (window.scrollY > 450) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", updateBackToTopVisibility, {
    passive: true
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateBackToTopVisibility();
}

/* =========================
   Clickable project cards
   ========================= */

const projectCards = document.querySelectorAll(
  ".project-card[data-link]"
);

projectCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "link");

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;

    window.open(
      card.dataset.link,
      "_blank",
      "noopener,noreferrer"
    );
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();

    window.open(
      card.dataset.link,
      "_blank",
      "noopener,noreferrer"
    );
  });
});

/* =========================
   Project cursor spotlight
   ========================= */

const supportsHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (supportsHover) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();

      card.style.setProperty(
        "--mouse-x",
        `${event.clientX - bounds.left}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${event.clientY - bounds.top}px`
      );
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "50%");
    });
  });
}

/* =========================
   Live GitHub repository data
   ========================= */

const GITHUB_CACHE_DURATION = 60 * 60 * 1000;

const formatGitHubDate = (dateString) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "recently";
  }

  const elapsedMilliseconds = date.getTime() - Date.now();
  const elapsedDays = Math.round(
    elapsedMilliseconds / (1000 * 60 * 60 * 24)
  );

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (Math.abs(elapsedDays) < 1) {
    return "today";
  }

  if (Math.abs(elapsedDays) < 30) {
    return relativeFormatter.format(elapsedDays, "day");
  }

  const elapsedMonths = Math.round(elapsedDays / 30);

  if (Math.abs(elapsedMonths) < 12) {
    return relativeFormatter.format(elapsedMonths, "month");
  }

  const elapsedYears = Math.round(elapsedDays / 365);

  return relativeFormatter.format(elapsedYears, "year");
};

const getCachedRepository = (repository) => {
  try {
    const cacheKey = `github-repo:${repository}`;
    const cachedValue = localStorage.getItem(cacheKey);

    if (!cachedValue) {
      return null;
    }

    const cachedRepository = JSON.parse(cachedValue);

    const cacheExpired =
      !cachedRepository.savedAt ||
      Date.now() - cachedRepository.savedAt >
        GITHUB_CACHE_DURATION;

    if (cacheExpired) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return cachedRepository.data;
  } catch (error) {
    console.warn("Could not read GitHub cache:", error);
    return null;
  }
};

const cacheRepository = (repository, data) => {
  try {
    localStorage.setItem(
      `github-repo:${repository}`,
      JSON.stringify({
        savedAt: Date.now(),
        data,
      })
    );
  } catch (error) {
    console.warn("Could not save GitHub cache:", error);
  }
};

const updateRepositoryStats = (card, repositoryData) => {
  const stars = card.querySelector('[data-stat="stars"]');
  const forks = card.querySelector('[data-stat="forks"]');
  const updated = card.querySelector('[data-stat="updated"]');
  const statsContainer = card.querySelector(".github-stats");

  if (stars) {
    stars.textContent =
      repositoryData.stargazers_count ?? 0;
  }

  if (forks) {
    forks.textContent =
      repositoryData.forks_count ?? 0;
  }

  if (updated) {
    updated.textContent = formatGitHubDate(
      repositoryData.pushed_at
    );
  }

  statsContainer?.classList.add("loaded");
};

const loadGitHubRepository = async (card) => {
  const repository = card.dataset.repo;
  const statsContainer = card.querySelector(".github-stats");

  if (!repository || !statsContainer) {
    return;
  }

  const cachedRepository = getCachedRepository(repository);

  if (cachedRepository) {
    updateRepositoryStats(card, cachedRepository);
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API returned status ${response.status}`
      );
    }

    const repositoryData = await response.json();

    cacheRepository(repository, repositoryData);
    updateRepositoryStats(card, repositoryData);
  } catch (error) {
    console.warn(
      `Could not load GitHub repository ${repository}:`,
      error
    );

    statsContainer.innerHTML = `
      <span class="github-stat github-unavailable">
        Public GitHub repository
      </span>
    `;

    statsContainer.classList.add("loaded");
  }
};

document
  .querySelectorAll(".project-card[data-repo]")
  .forEach((card) => {
    loadGitHubRepository(card);
  });