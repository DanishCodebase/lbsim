

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
  const sliderContainer = document.querySelector(".international-section");
  if (!sliderContainer) return;

  const slider = sliderContainer.querySelector(".process-steps");
  const items = slider.querySelectorAll(".step-card");
  if (items.length === 0) return;

  // Create and inject controls
  const controlsHtml = `
    <div class="slider-controls">
      <div class="slider-indicators"></div>
    </div>
  `;
  slider.insertAdjacentHTML('afterend', controlsHtml);
  const indicatorsContainer = sliderContainer.querySelector(".slider-indicators");

  let itemsPerPage = getItemsPerPage();
  let totalPages = Math.ceil(items.length / itemsPerPage);
  let currentPage = 0;
  let scrollInterval;

  function getItemsPerPage() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  }

  function setupSlider() {
    itemsPerPage = getItemsPerPage();
    totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage >= totalPages) {
      currentPage = totalPages - 1;
    }
    setupIndicators();
    goToPage(currentPage, 'auto');
  }

  function setupIndicators() {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const button = document.createElement('button');
      button.classList.add('indicator');
      button.setAttribute('aria-label', `Go to slide ${i + 1}`);
      button.addEventListener('click', () => {
        goToPage(i);
        stopAutoScroll();
        startAutoScroll(); // Reset interval on manual navigation
      });
      indicatorsContainer.appendChild(button);
    }
    updateIndicators();
  }

  function updateIndicators() {
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentPage);
    });
  }

  function goToPage(pageNumber, behavior = 'smooth') {
    currentPage = pageNumber;
    const cardWidth = items[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(slider).gap, 10) || 0;
    const scrollAmount = currentPage * (cardWidth * itemsPerPage + gap * itemsPerPage);
    
    // A more precise scroll calculation
    let totalWidth = 0;
    for(let i=0; i < currentPage * itemsPerPage; i++){
        totalWidth += items[i].offsetWidth + gap;
    }

    slider.scrollTo({
      left: totalWidth,
      behavior: behavior
    });

    updateIndicators();
  }

  function startAutoScroll() {
    stopAutoScroll();
    scrollInterval = setInterval(() => {
      let nextPage = (currentPage + 1) % totalPages;
      goToPage(nextPage);
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  // Event Listeners
  slider.addEventListener('mouseenter', stopAutoScroll);
  slider.addEventListener('mouseleave', startAutoScroll);
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupSlider, 250);
  });

  // Initial setup
  setupSlider();
  startAutoScroll();
});
