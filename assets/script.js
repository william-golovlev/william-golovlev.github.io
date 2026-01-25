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

  // Show navbar search bar only on blog page
  const navbarSearch = document.getElementById("navbar-search");
  if (navbarSearch) {
    if (currentPath.endsWith("blog.html") || currentPath.includes("/blog")) {
      navbarSearch.style.display = "flex";
    } else {
      navbarSearch.style.display = "none";
    }
  }

  // Fix blog page glow issue by removing text shadows from nav elements
  if (currentPath.endsWith("blog.html") || currentPath.includes("/blog")) {
    document.body.classList.add("blog-page");
    
    // Force remove text shadows from all nav-related elements
    const navElements = document.querySelectorAll(".nav-links a, .nav-links a *, .nav-links a .icon, .nav-links a span");
    navElements.forEach(element => {
      element.style.textShadow = "none";
    });
  } else {
    document.body.classList.remove("blog-page");
  }
});
