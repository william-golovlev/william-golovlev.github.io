// --- Video Background Script ---
const videoFiles = [
  "https://res.cloudinary.com/dikzytnwj/video/upload/v1757377343/green_jxjkus.mp4",
  "https://res.cloudinary.com/dikzytnwj/video/upload/v1757377345/Sunset_jlxpyw.mp4",
  "https://res.cloudinary.com/dikzytnwj/video/upload/v1757377342/florida_wjc3i9.mp4",
];

function setRandomVideo() {
  const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
  const videoElement = document.getElementById("video-background");
  if (videoElement) {
    videoElement.src = randomVideo;
    videoElement.play();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setRandomVideo();

  // Hamburger menu toggle for mobile
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector("#navMenu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  }

  // Add active class to current page nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");
  
  navLinks.forEach((link, index) => {
    const href = link.getAttribute("href");
    
    // Remove any existing active classes
    link.classList.remove("active");
    
    // Add active class to matching link
    if (href === currentPath || 
        (currentPath === "/" && href === "/") ||
        (currentPath.endsWith("blog.html") && href === "/blog.html") ||
        (currentPath.endsWith("about.html") && href === "/about.html") ||
        (currentPath.endsWith("contact.html") && href === "/contact.html")) {
      link.classList.add("active");
    }
  });

  // Fix blog page glow issue by removing text shadows from nav elements
  if (currentPath.endsWith("blog.html") || currentPath.includes("/blog")) {
    document.body.classList.add("blog-page");
    
    // Force remove text shadows from all nav-related elements
    const navElements = document.querySelectorAll(".nav-links a, .nav-links a *, .nav-links a .icon, .nav-links a span");
    navElements.forEach(element => {
      element.style.textShadow = "none";
      element.style.boxShadow = "none";
      element.style.filter = "none";
    });
  } else {
    document.body.classList.remove("blog-page");
  }
});

// Simple carousel functionality
let currentSlide = 0;
const totalSlides = 3;

function changeSlide(direction) {
  currentSlide += direction;
  
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }
  
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  const track = document.querySelector('.carousel-track');
  const indicators = document.querySelectorAll('.indicator');
  
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
  if (document.querySelector('.projects-carousel')) {
    changeSlide(1);
  }
}, 5000);
