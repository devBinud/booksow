
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


// Function to toggle visibility based on screen width
function toggleSearchForms() {
  const desktopSearchForm = document.getElementById('desktopSearchForm');
  const mobileSearchForm = document.getElementById('mobileSearchForm');
  
  if (window.innerWidth <= 576) {
    desktopSearchForm.style.display = 'none';
    mobileSearchForm.style.display = 'flex';
  } else {
    desktopSearchForm.style.display = 'flex';
    mobileSearchForm.style.display = 'none';
  }
}

// Call the function on load and resize
window.addEventListener('load', toggleSearchForms);
window.addEventListener('resize', toggleSearchForms);




// quanity handle JS custom Added 


// Get the elements
const decrementBtn = document.getElementById('decrementBtn');
const incrementBtn = document.getElementById('incrementBtn');
const quantityInput = document.getElementById('quantityInput');

// Function to update the buttons based on the quantity
function updateButtons() {
    const currentValue = parseInt(quantityInput.value, 10);

    // Disable decrement button if the quantity is 1
    if (currentValue <= 1) {
        decrementBtn.disabled = true;
    } else {
        decrementBtn.disabled = false;
    }
}

// Decrement functionality
decrementBtn.addEventListener('click', function() {
    let currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
        currentValue--;
        quantityInput.value = currentValue;
        updateButtons();
    }
});

// Increment functionality
incrementBtn.addEventListener('click', function() {
    let currentValue = parseInt(quantityInput.value, 10);
    currentValue++;
    quantityInput.value = currentValue;
    updateButtons();
});

// Initialize buttons on page load
updateButtons();



// search popup 
// Show dropdown on input focus
function showSearchList() {
  document.getElementById("searchList").style.display = "block";
}

// Hide dropdown on input blur
function hideSearchList() {
  setTimeout(() => {
      document.getElementById("searchList").style.display = "none";
  }, 200); // Timeout to allow clicking on list items
}

// TWO SEARCH BOX 

// Show dropdown on input focus
function showSearchListTwo() {
  document.getElementById("searchListTwo").style.display = "block";
}

  // Hide dropdown on input blur
  function hideSearchListTwo() {
    setTimeout(() => {
        document.getElementById("searchListTwo").style.display = "none";
    }, 200); // Timeout to allow clicking on list items
  }


  // Hide the COD notice initially
  document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('codNotice').style.display = 'none';
  });

  // Show/hide the COD notice based on selection
  document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
      input.addEventListener('change', function () {
          const codNotice = document.getElementById('codNotice');
          // Show only when "cashOnDelivery" is selected
          codNotice.style.display = this.value === 'cashOnDelivery' ? 'block' : 'none';
      });
  });




  

  function slide(direction) {
    const scrollContainer = document.querySelector('.horizontal-scroll');
    const scrollAmount = 300; // Adjust the number for smoother or faster scrolling
    
    if (direction === 1) {
      // Slide to the right (next)
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === -1) {
      // Slide to the left (prev)
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  }
  
  function slideBestSellers(direction) {
    const scrollContainer = document.querySelector('.bestSellers__home .horizontal-scroll');
    const scrollAmount = 300; // Adjust this for smoother or faster scrolling
    
    if (direction === 1) {
      // Slide to the right (next)
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === -1) {
      // Slide to the left (prev)
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  }
  

  function slideShortSelfHelp(direction) {
    const scrollContainer = document.querySelector('.shortSelfHelp__books .horizontal-scroll');
    const scrollAmount = 300; // Adjust this for smoother or faster scrolling
    
    if (direction === 1) {
      // Slide to the right (next)
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === -1) {
      // Slide to the left (prev)
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  }
  
    const mainImage = document.getElementById('mainProductImage');
    const carouselImages = document.querySelectorAll('.product-image');
    const carouselItems = document.querySelectorAll('.carousel-item');

    // Function to set the main image based on the active carousel image
    function updateMainImage() {
        const activeImage = document.querySelector('.product-image.active');
        if (activeImage) {
            mainImage.src = activeImage.src;
        }
    }

    // Function to highlight the active image
    function highlightActiveImage() {
        carouselImages.forEach((img) => img.classList.remove('active')); // Remove active class from all images

        // Find the currently visible carousel item
        const activeItem = document.querySelector('.carousel-item.active');
        if (activeItem) {
            const images = activeItem.querySelectorAll('.product-image');
            images[0].classList.add('active'); // Set the first image in the visible item as active
        }

        updateMainImage(); // Update the main image
    }

    // Add event listeners to update active state on slide
    document
        .getElementById('customProductCarousel')
        .addEventListener('slid.bs.carousel', highlightActiveImage);

    // Initialize
    highlightActiveImage();

    // Add click event to images for manual selection
    carouselImages.forEach((img) => {
        img.addEventListener('click', () => {
            carouselImages.forEach((img) => img.classList.remove('active'));
            img.classList.add('active');
            updateMainImage();
        });
    });



    // HOME SEARCH BAR FUNCTIONALITIES

    