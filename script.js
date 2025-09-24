document.addEventListener("DOMContentLoaded", function () {
  // Accreditations Slider
  const accreditationsSlider = document.querySelector(".accreditations");
  const columns = document.querySelectorAll(".accreditations .column");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const indicatorsContainer = document.querySelector(".slider-indicators");

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  if (columns.length > 0 && accreditationsSlider && prevBtn && nextBtn && indicatorsContainer) {
    // Create indicators
    columns.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      if (index === 0) {
        indicator.classList.add("active");
      }
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
      indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll(".indicator");

    function updateSlider() {
      if (window.innerWidth <= 768) {
        // Calculate the transform value to show the current slide
        const translateX = -currentIndex * 25; // Each slide is 25% wide
        accreditationsSlider.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle("active", index === currentIndex);
        });
      } else {
        // Reset transform for desktop view
        accreditationsSlider.style.transform = "translateX(0)";
      }
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % columns.length;
      updateSlider();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + columns.length) % columns.length;
      updateSlider();
    }

    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // Touch/swipe functionality
    accreditationsSlider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    accreditationsSlider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        showNext(); // Swipe left - next slide
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        showPrev(); // Swipe right - previous slide
      }
    }

    // Update slider on window resize
    window.addEventListener("resize", updateSlider);
    updateSlider(); // Initial call
  }

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
