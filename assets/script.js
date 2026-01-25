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
  
  console.log("Current path:", currentPath);
  console.log("Found nav links:", navLinks.length);
  
  navLinks.forEach((link, index) => {
    const href = link.getAttribute("href");
    console.log(`Link ${index}: href="${href}"`);
    
    // Remove any existing active classes
    link.classList.remove("active");
    
    // Add active class to matching link
    if (href === currentPath || 
        (currentPath === "/" && href === "/") ||
        (currentPath.endsWith("blog.html") && href === "/blog.html") ||
        (currentPath.endsWith("about.html") && href === "/about.html") ||
        (currentPath.endsWith("contact.html") && href === "/contact.html")) {
      console.log(`Adding active class to link: ${href}`);
      link.classList.add("active");
    }
  });
});
