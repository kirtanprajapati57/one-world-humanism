// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    menuToggle.textContent = "✕";
  } else {
    menuToggle.textContent = "☰";
  }
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// Dark / light mode
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("owh-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("owh-theme", "dark");
    themeToggle.textContent = "☀";
  } else {
    localStorage.setItem("owh-theme", "light");
    themeToggle.textContent = "◐";
  }
});

// FAQ accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
  question.addEventListener("click", () => {

    const item = question.parentElement;

    document.querySelectorAll(".faq-item").forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-question span").textContent = "+";
      }
    });

    item.classList.toggle("active");

    const symbol = question.querySelector("span");

    if (item.classList.contains("active")) {
      symbol.textContent = "−";
    } else {
      symbol.textContent = "+";
    }
  });
});

// Reveal sections when scrolling
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".card, .principle, .constitution article, .timeline-item")
  .forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
