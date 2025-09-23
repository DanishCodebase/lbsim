document.addEventListener("DOMContentLoaded", function () {
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
