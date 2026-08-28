/* =========================================
   ONE-WORLD HUMANISM
   Main JavaScript
   ========================================= */


/* -----------------------------------------
   MOBILE NAVIGATION
   ----------------------------------------- */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}


/* -----------------------------------------
   DARK / LIGHT MODE
   ----------------------------------------- */

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {
  if (!themeToggle) return;

  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "☾";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  } else {
    themeToggle.textContent = "☀";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }
}

const savedTheme = localStorage.getItem("owh-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const theme = document.body.classList.contains("light")
      ? "light"
      : "dark";

    localStorage.setItem("owh-theme", theme);

    updateThemeIcon();
  });
}


/* -----------------------------------------
   NAVBAR ON SCROLL
   ----------------------------------------- */

const navbar = document.getElementById("navbar");

function updateNavbar() {
  if (!navbar) return;

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();


/* -----------------------------------------
   SCROLL REVEAL ANIMATION
   ----------------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* -----------------------------------------
   FAQ ACCORDION
   ----------------------------------------- */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

  question.addEventListener("click", () => {

    const currentItem = question.parentElement;
    const currentAnswer = currentItem.querySelector(".faq-answer");

    document.querySelectorAll(".faq-item").forEach(item => {

      if (item !== currentItem) {

        item.classList.remove("active");

        const answer = item.querySelector(".faq-answer");

        if (answer) {
          answer.style.maxHeight = null;
        }

      }

    });

    currentItem.classList.toggle("active");

    if (currentItem.classList.contains("active")) {
      currentAnswer.style.maxHeight =
        currentAnswer.scrollHeight + "px";
    } else {
      currentAnswer.style.maxHeight = null;
    }

  });

});


/* -----------------------------------------
   BACK TO TOP BUTTON
   ----------------------------------------- */

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {

  if (!backToTop) return;

  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

}

window.addEventListener("scroll", updateBackToTop);

if (backToTop) {

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* -----------------------------------------
   CURRENT YEAR
   ----------------------------------------- */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* -----------------------------------------
   CLOSE MENU WHEN CLICKING OUTSIDE
   ----------------------------------------- */

document.addEventListener("click", event => {

  if (!navLinks || !menuToggle) return;

  const clickedInsideMenu =
    navLinks.contains(event.target);

  const clickedMenuButton =
    menuToggle.contains(event.target);

  if (
    navLinks.classList.contains("open") &&
    !clickedInsideMenu &&
    !clickedMenuButton
  ) {
    navLinks.classList.remove("open");
  }

});


/* -----------------------------------------
   KEYBOARD ACCESSIBILITY
   ----------------------------------------- */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    if (navLinks) {
      navLinks.classList.remove("open");
    }

    document.querySelectorAll(".faq-item").forEach(item => {

      item.classList.remove("active");

      const answer = item.querySelector(".faq-answer");

      if (answer) {
        answer.style.maxHeight = null;
      }

    });

  }

});


/* -----------------------------------------
   REDUCE ANIMATIONS IF USER PREFERS IT
   ----------------------------------------- */

const reducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches) {

  document.documentElement.style.scrollBehavior = "auto";

  document.querySelectorAll("*").forEach(element => {
    element.style.animationDuration = "0.01ms";
    element.style.transitionDuration = "0.01ms";
  });

}
