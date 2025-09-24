document.addEventListener("DOMContentLoaded", function () {
  // Alumni Auto-Slider
  const alumniSlider = document.querySelector(".alumni-slider");
  const alumniCards = document.querySelectorAll(".alumni-card");
  const prevBtn = document.querySelector(".alumni-prev-btn");
  const nextBtn = document.querySelector(".alumni-next-btn");
  const indicatorsContainer = document.querySelector(".alumni-slider-indicators");

  let currentIndex = 0;
  let cardsPerSlide = 4; // Default for desktop
  let totalSlides = 0;
  let autoSlideInterval;
  let isTransitioning = false;

  // Function to get cards per slide based on screen width
  function getCardsPerSlide() {
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    if (width >= 500) return 2;
    return 1;
  }

  // Function to calculate total slides
  function calculateTotalSlides() {
    cardsPerSlide = getCardsPerSlide();
    totalSlides = Math.max(1, alumniCards.length - cardsPerSlide + 1);
  }

  // Function to create indicators
  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('alumni-indicator');
      if (i === 0) indicator.classList.add('active');
      
      indicator.addEventListener('click', () => {
        if (!isTransitioning) {
          goToSlide(i);
          resetAutoSlide();
        }
      });
      
      indicatorsContainer.appendChild(indicator);
    }
  }

  // Function to update slider position
  function updateSlider() {
    if (!alumniSlider || isTransitioning) return;
    
    isTransitioning = true;
    const cardWidth = alumniCards[0].offsetWidth;
    const gap = 20;
    const translateX = -(currentIndex * (cardWidth + gap));
    
    alumniSlider.style.transform = `translateX(${translateX}px)`;
    
    // Update indicators
    document.querySelectorAll('.alumni-indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
    
    // Reset transition flag after animation completes
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  // Function to go to specific slide
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateSlider();
  }

  // Function to go to next slide
  function nextSlide() {
    if (!isTransitioning) {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }
  }

  // Function to go to previous slide
  function prevSlide() {
    if (!isTransitioning) {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
  }

  // Auto-slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); // 4 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Initialize slider
  function initSlider() {
    if (alumniCards.length === 0) return;
    
    calculateTotalSlides();
    createIndicators();
    currentIndex = 0;
    updateSlider();
    startAutoSlide();
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  // Pause auto-slide on hover
  if (alumniSlider) {
    alumniSlider.addEventListener('mouseenter', stopAutoSlide);
    alumniSlider.addEventListener('mouseleave', startAutoSlide);
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newCardsPerSlide = getCardsPerSlide();
      if (newCardsPerSlide !== cardsPerSlide) {
        calculateTotalSlides();
        createIndicators();
        currentIndex = Math.min(currentIndex, totalSlides - 1);
        updateSlider();
      }
    }, 250);
  });

  // Initialize the slider
  initSlider();

  const courseCards = document.querySelectorAll(".course-card");

  // Add click handlers for course cards
  courseCards.forEach((card) => {
    card.addEventListener("click", function () {
      const courseTitle = this.querySelector(".course-label").textContent;
      console.log(`${courseTitle} clicked`);

      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add smooth scroll animation for course cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Initialize course cards with animation
  courseCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
        .course-card {
          position: relative;
          overflow: hidden;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.1);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
document.head.appendChild(style);
