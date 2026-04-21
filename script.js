const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const seeMoreBtn = document.getElementById("seeMoreBtn");
const aboutModal = document.getElementById("aboutModal");
const modalClose = document.querySelector(".modal-close");
let slideIndex = 1;
let slideTimer;

seeMoreBtn.addEventListener("click", () => {
  aboutModal.classList.add("show");
  showSlides(slideIndex);
  startSlideshow();
});

modalClose.addEventListener("click", () => {
  aboutModal.classList.remove("show");
  clearTimeout(slideTimer);
});

aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.classList.remove("show");
    clearTimeout(slideTimer);
  }
});

function currentSlide(n) {
  clearTimeout(slideTimer);
  showSlides((slideIndex = n));
  startSlideshow();
}

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

function startSlideshow() {
  slideTimer = setTimeout(() => {
    slideIndex++;
    showSlides(slideIndex);
    startSlideshow();
  }, 4000);
}

document.addEventListener("keydown", (e) => {
  if (aboutModal.classList.contains("show")) {
    if (e.key === "Escape") {
      aboutModal.classList.remove("show");
      clearTimeout(slideTimer);
    } else if (e.key === "ArrowLeft") {
      clearTimeout(slideTimer);
      currentSlide((slideIndex -= 1));
    } else if (e.key === "ArrowRight") {
      clearTimeout(slideTimer);
      currentSlide((slideIndex += 1));
    }
  }
});