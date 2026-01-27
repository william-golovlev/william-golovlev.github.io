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

// Auto-advance carousel every 8 seconds
setInterval(() => {
  if (document.querySelector('.projects-carousel')) {
    changeSlide(1);
  }
}, 8000);

// --- Scroll Triggered Animations ---
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe timeline elements
  const timeline = document.querySelector('.timeline');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timeline) {
    observer.observe(timeline);
  }
  
  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupScrollAnimations();
  setupCodeBlocks();
  setupFloatingElements();
  setupParallax();
  setupLoadingAnimations();
  setupEnhancedNavigation();
});

// --- Enhanced Navigation ---
function setupEnhancedNavigation() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection(); // Initial call

  // Add breadcrumb navigation to blog posts
  const blogPosts = document.querySelectorAll('.blog-post');
  blogPosts.forEach(post => {
    const breadcrumb = document.createElement('nav');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.innerHTML = `
      <a href="/">Home</a>
      <span class="breadcrumb-separator">›</span>
      <a href="/blog.html">Blog</a>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-current">${post.querySelector('h1')?.textContent || 'Post'}</span>
    `;
    
    const title = post.querySelector('h1');
    if (title) {
      title.parentNode.insertBefore(breadcrumb, title);
    }
  });
}

// --- Floating Elements ---
function setupFloatingElements() {
  // Scroll to top button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Floating social links
  const floatingSocial = document.createElement('div');
  floatingSocial.className = 'floating-social';
  floatingSocial.innerHTML = `
    <a href="https://github.com/william-golovlev" target="_blank" class="floating-social-link" aria-label="GitHub">
      <i class="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com/in/william-golovlev" target="_blank" class="floating-social-link" aria-label="LinkedIn">
      <i class="fab fa-linkedin"></i>
    </a>
    <a href="mailto:william.golovlev@example.com" class="floating-social-link" aria-label="Email">
      <i class="fas fa-envelope"></i>
    </a>
  `;
  document.body.appendChild(floatingSocial);

  // Show social links after a delay
  setTimeout(() => {
    floatingSocial.classList.add('visible');
  }, 1000);
}

// --- Parallax Effects ---
function setupParallax() {
  const videoBackground = document.querySelector('.video-background');
  
  if (videoBackground) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        videoBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
      }
    });
  }
}

// --- Loading Animations ---
function setupLoadingAnimations() {
  // Create skeleton loader
  const skeletonLoader = document.createElement('div');
  skeletonLoader.className = 'skeleton-loader';
  skeletonLoader.innerHTML = `
    <div class="loader-spinner"></div>
    <div class="loading-text">Loading amazing content...</div>
  `;
  document.body.appendChild(skeletonLoader);

  // Show loader initially
  skeletonLoader.classList.add('active');

  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      skeletonLoader.classList.remove('active');
    }, 500);
  });

  // Reading progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// --- Interactive Code Blocks ---
function setupCodeBlocks() {
  // Add copy functionality to all code copy buttons
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block');
      const codeContent = codeBlock.querySelector('.line-content').textContent;
      
      navigator.clipboard.writeText(codeContent).then(() => {
        this.classList.add('copied');
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          this.classList.remove('copied');
          this.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      });
    });
  });

  // Add expand/collapse functionality
  document.querySelectorAll('.code-expand-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const codeContent = this.closest('.code-block').querySelector('.code-content');
      codeContent.classList.toggle('expanded');
      
      if (codeContent.classList.contains('expanded')) {
        this.textContent = 'Collapse';
      } else {
        this.textContent = 'Expand';
      }
    });
  });
}
