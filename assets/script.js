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
  
  navLinks.forEach(link => {
    // Remove any existing active classes
    link.classList.remove("active");
    
    // Add active class to matching link
    if (link.getAttribute("href") === currentPath || 
        (currentPath === "/" && link.getAttribute("href") === "/") ||
        (currentPath.endsWith("blog.html") && link.getAttribute("href") === "/blog.html") ||
        (currentPath.endsWith("about.html") && link.getAttribute("href") === "/about.html") ||
        (currentPath.endsWith("contact.html") && link.getAttribute("href") === "/contact.html")) {
      link.classList.add("active");
    }
  });
});
