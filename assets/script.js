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
const totalSlides = 4;

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
  setupSkillAnimations();
  setupBlogCodeBlocks();
});

// --- Skill Progress Bars Animation ---
function setupSkillAnimations() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const levelFill = entry.target.querySelector('.level-fill');
        if (levelFill) {
          const level = levelFill.getAttribute('data-level');
          setTimeout(() => {
            levelFill.style.width = level + '%';
          }, 200);
        }
      }
    });
  }, { threshold: 0.5 });
  
  skillCards.forEach(card => {
    observer.observe(card);
  });
}

// --- Enhanced Blog Code Blocks ---
function setupBlogCodeBlocks() {
  // Add copy functionality to blog post code blocks
  document.querySelectorAll('.post-content pre').forEach(pre => {
    // Skip if already processed
    if (pre.querySelector('.code-copy-btn')) return;
    
    const code = pre.querySelector('code');
    if (!code) return;
    
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyBtn.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 2;
      user-select: none;
    `;
    
    // Style the code block
    pre.style.cssText = `
      position: relative;
      background: #1e1e1e;
      border-radius: 12px;
      margin: 2rem 0;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      border: 1px solid #333;
    `;
    
    code.style.cssText = `
      display: block;
      padding: 1.5rem 1.5rem 1.5rem 4rem;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #e2e8f0;
      overflow-x: auto;
      background: transparent;
      border: none;
      margin: 0;
    `;
    
    pre.appendChild(copyBtn);
    
    // Copy functionality
    copyBtn.addEventListener('click', function() {
      const text = code.textContent || code.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
        
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-copy"></i> Copy';
          this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 2000);
      });
    });
    
    // Add line numbers
    const lines = code.textContent.split('\n');
    const lineNumbers = lines.map((_, index) => index + 1).join('\n');
    
    const lineNumbersContainer = document.createElement('span');
    lineNumbersContainer.className = 'line-numbers';
    lineNumbersContainer.textContent = lineNumbers;
    lineNumbersContainer.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      width: 3rem;
      padding: 1.5rem 0.5rem;
      background: rgba(0, 0, 0, 0.3);
      color: #666;
      text-align: right;
      font-size: 0.8rem;
      line-height: 1.6;
      user-select: none;
      border-right: 1px solid #333;
    `;
    
    pre.insertBefore(lineNumbersContainer, code);
  });
}

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
  // Only show loader if page is taking time to load
  let loaderShown = false;
  
  const showLoader = () => {
    if (!loaderShown) {
      const skeletonLoader = document.createElement('div');
      skeletonLoader.className = 'skeleton-loader';
      skeletonLoader.innerHTML = `
        <div class="loader-spinner"></div>
        <div class="loading-text">Loading amazing content...</div>
      `;
      document.body.appendChild(skeletonLoader);
      skeletonLoader.classList.add('active');
      loaderShown = true;
    }
  };
  
  // Show loader only if page takes more than 2 seconds to load
  const loaderTimer = setTimeout(showLoader, 2000);
  
  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    clearTimeout(loaderTimer);
    const skeletonLoader = document.querySelector('.skeleton-loader');
    if (skeletonLoader) {
      setTimeout(() => {
        skeletonLoader.classList.remove('active');
        setTimeout(() => {
          skeletonLoader.remove();
        }, 300);
      }, 500);
    }
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
