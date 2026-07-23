const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const header = document.getElementById("header");
const profilePhoto = document.getElementById("profilePhoto");
const photoFallback = document.getElementById("photoFallback");

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("active");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

profilePhoto.addEventListener("error", () => {
  profilePhoto.style.display = "none";
  photoFallback.style.display = "grid";
});

if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
  profilePhoto.style.display = "none";
  photoFallback.style.display = "grid";
}

document.getElementById("year").textContent = new Date().getFullYear();
