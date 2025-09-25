

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

// Auto-slider for International Collaborations Section
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".international-section .process-steps");
  let scrollAmount = 0;
  let scrollInterval;

  function startSlider() {
    scrollInterval = setInterval(() => {
      if (slider) {
        const cardWidth = slider.querySelector(".step-card").offsetWidth;
        scrollAmount += cardWidth;

        if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
          scrollAmount = 0;
        }

        slider.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 2000); // Change slide every 2 seconds
  }

  function stopSlider() {
    clearInterval(scrollInterval);
  }

  if (slider) {
    startSlider();

    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);
  }
});
