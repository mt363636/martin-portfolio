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