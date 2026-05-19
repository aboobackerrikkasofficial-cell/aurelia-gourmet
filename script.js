/* -------------------------------------------------------------
 * AURELIA GOURMET - LUXURY DRY FRUITS BRAND
 * CORE INTERACTIVE ENGINE (VANILLA JAVASCRIPT)
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. CACHED IMAGE RECOVERY SCANNER
  // ==========================================
  // ==========================================
  // 0. LUXURY LAZY LOADING & SMOOTH REVEAL ENGINE
  // ==========================================
  const allImages = document.querySelectorAll('.fade-in-img');
  
  const revealImage = (img) => {
    const markAsLoaded = () => {
      img.classList.add('loaded');
      const container = img.closest('.premium-card-image, .image-skeleton-container');
      if (container) {
        container.classList.remove('loading-skeleton');
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      markAsLoaded();
    } else {
      img.addEventListener('load', markAsLoaded);
      img.addEventListener('error', () => {
        if (typeof handleBrokenImage === 'function') {
          handleBrokenImage(img);
        }
      });
    }
  };

  // Intersection Observer for smooth reveal animation on scroll
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          revealImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      root: null,
      rootMargin: '80px 0px', // Start loading before entering viewport for luxury speed
      threshold: 0.01
    });

    allImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    allImages.forEach(img => {
      revealImage(img);
    });
  }

  // ==========================================
  // 1. DUAL-RING CURSOR SYSTEM
  // ==========================================
  const customCursor = document.getElementById('customCursor');
  const customCursorRing = document.getElementById('customCursorRing');
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = window.innerWidth / 2;
  let ringY = window.innerHeight / 2;

  // Track mouse movements
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instantly place the central dot
    customCursor.style.left = `${mouseX}px`;
    customCursor.style.top = `${mouseY}px`;
  });

  // Smooth frame interpolation loop for outer ring
  function animateCursorRing() {
    const ease = 0.15; // Delay rate factor (0.15 is perfect smoothness)
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    
    customCursorRing.style.left = `${ringX}px`;
    customCursorRing.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateCursorRing);
  }
  requestAnimationFrame(animateCursorRing);

  // General cursor hover triggers
  function bindCursorHoverTriggers() {
    const hoverables = document.querySelectorAll('a, button, select, input, textarea, .cursor-hover, .qty-btn, .add-to-cart-icon');
    hoverables.forEach(el => {
      // Remove any duplicate listeners
      el.removeEventListener('mouseenter', onMouseEnterHover);
      el.removeEventListener('mouseleave', onMouseLeaveHover);
      
      // Bind hover events
      el.addEventListener('mouseenter', onMouseEnterHover);
      el.addEventListener('mouseleave', onMouseLeaveHover);
    });
  }

  function onMouseEnterHover() {
    document.body.classList.add('cursor-hovering');
  }

  function onMouseLeaveHover() {
    document.body.classList.remove('cursor-hovering');
  }

  // Initialize cursor bindings
  bindCursorHoverTriggers();

  // ==========================================
  // 2. LUXURY PRELOADER ANIMATION
  // ==========================================
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  
  let progress = 0;
  const progressInterval = setInterval(() => {
    // Elegant incremental progress fill
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      
      // Trigger preloader fade-out
      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Trigger initial scroll reveal check
        setTimeout(checkScrollReveal, 100);
      }, 500);
    }
    preloaderProgress.style.width = `${progress}%`;
  }, 75);

  // ==========================================
  // 3. STICKY NAV & ACTIVE LINK HIGHLIGHTS
  // ==========================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add Scrolled backdrop class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight Active Link on Scroll
    let currentSectionId = 'hero';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. MOBILE HAMBURGER CONTROL
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNavPanel = document.getElementById('mobileNavPanel');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileToggle.classList.toggle('open');
    mobileNavPanel.classList.toggle('open');
    
    // Lock scroll when menu panel is open
    if (mobileNavPanel.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  mobileToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu and navigate smoothly
      mobileToggle.classList.remove('open');
      mobileNavPanel.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // 5. OBSERVER SCROLL REVEAL BINDINGS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.88;
    
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('revealed');
      }
    });
  }

  // Bind scroll for reveals
  window.addEventListener('scroll', checkScrollReveal);

  // ==========================================
  // 6. SOVEREIGN SHOPPING BAG ENGINE (CART)
  // ==========================================
  let cart = [];
  
  const cartTrigger = document.getElementById('cartTrigger');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBadge = document.getElementById('cartBadge');
  const cartEmptyMessage = document.getElementById('cartEmptyMessage');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartDrawerFooter = document.getElementById('cartDrawerFooter');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotalValue = document.getElementById('cartTotalValue');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartExploreBtn = document.getElementById('cartExploreBtn');

  // Load from local storage
  if (localStorage.getItem('aurelia_cart')) {
    try {
      cart = JSON.parse(localStorage.getItem('aurelia_cart'));
      updateCartUI();
    } catch(e) {
      cart = [];
    }
  }

  function openCartDrawer() {
    cartDrawerOverlay.classList.add('open');
    cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // lock background
  }

  function closeCartDrawer() {
    cartDrawerOverlay.classList.remove('open');
    cartDrawer.classList.remove('open');
    document.body.style.overflow = ''; // unlock scroll
  }

  cartTrigger.addEventListener('click', openCartDrawer);
  cartCloseBtn.addEventListener('click', closeCartDrawer);
  cartDrawerOverlay.addEventListener('click', closeCartDrawer);
  cartExploreBtn.addEventListener('click', closeCartDrawer);

  // Quick Shop Action Triggers
  document.body.addEventListener('click', (e) => {
    // Match Add To Bag button inside overlay OR bottom icon button
    const target = e.target.closest('.btn-quick-add, .add-to-cart-icon');
    if (target) {
      e.preventDefault();
      const id = target.getAttribute('data-id');
      const name = target.getAttribute('data-name');
      const price = parseFloat(target.getAttribute('data-price'));
      
      // Determine Unsplash image mapping
      const productCard = target.closest('.product-card');
      const imgUrl = productCard ? productCard.querySelector('.product-img').src : '';
      
      addToCart(id, name, price, imgUrl);
    }
  });

  function addToCart(id, name, price, imgUrl) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ id, name, price, imgUrl, qty: 1 });
    }
    
    saveCart();
    updateCartUI();
    openCartDrawer();
    
    // Luxury Alert Notification Toast
    showLuxuryToast(`Added ${name} allocation to bag.`);
  }

  function saveCart() {
    localStorage.setItem('aurelia_cart', JSON.stringify(cart));
  }

  function updateCartUI() {
    // 1. Badge Quantity
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartBadge.textContent = totalQty;
    
    // Show/Hide Empty Notification
    if (cart.length === 0) {
      cartEmptyMessage.style.display = 'flex';
      cartItemsList.style.display = 'none';
      cartDrawerFooter.style.display = 'none';
    } else {
      cartEmptyMessage.style.display = 'none';
      cartItemsList.style.display = 'flex';
      cartDrawerFooter.style.display = 'block';
      
      // 2. Render List Items
      cartItemsList.innerHTML = '';
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div class="image-skeleton-container loading-skeleton" style="width: 75px; height: 75px; border-radius: var(--border-radius-sm); border: 1px solid rgba(197, 168, 128, 0.15); flex-shrink: 0; overflow: hidden;">
            <img src="${item.imgUrl}" 
                 alt="${item.name}" 
                 class="cart-item-img fade-in-img"
                 width="75" height="75"
                 loading="lazy"
                 decoding="async"
                 onload="initImageLoad(this)"
                 onerror="handleBrokenImage(this)"
                 style="width: 100%; height: 100%; object-fit: cover; border: none; transition: opacity 0.5s ease;">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            <div class="cart-item-qty-controls">
              <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
              <span class="cart-item-remove-btn cursor-hover remove-item" data-id="${item.id}">Remove</span>
            </div>
          </div>
          <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
        `;
        cartItemsList.appendChild(li);
      });
      
      // 3. Totals Calculations
      const subtotalVal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
      cartSubtotal.textContent = `$${subtotalVal.toFixed(2)}`;
      cartTotalValue.textContent = `$${subtotalVal.toFixed(2)}`;
    }
    
    // Rebind newly loaded buttons to custom cursor triggers
    bindCursorHoverTriggers();
  }

  // Cart Qty Increments/Decrements listener
  cartItemsList.addEventListener('click', (e) => {
    const target = e.target;
    const id = target.getAttribute('data-id');
    
    if (target.classList.contains('inc-qty')) {
      const item = cart.find(item => item.id === id);
      if (item) item.qty += 1;
      saveCart();
      updateCartUI();
    } else if (target.classList.contains('dec-qty')) {
      const item = cart.find(item => item.id === id);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          cart = cart.filter(item => item.id !== id);
        }
      }
      saveCart();
      updateCartUI();
    } else if (target.classList.contains('remove-item')) {
      cart = cart.filter(item => item.id !== id);
      saveCart();
      updateCartUI();
      showLuxuryToast("Removed allocation from bag.");
    }
  });

  // Secure checkout click trigger
  checkoutBtn.addEventListener('click', () => {
    showLuxuryToast("Redirecting to secured concierge gateway...");
    setTimeout(() => {
      alert("Allocation Request Secured. An elite concierge representative will contact your distinguished office within 2 hours.");
      cart = [];
      saveCart();
      updateCartUI();
      closeCartDrawer();
    }, 1200);
  });

  // ==========================================
  // 7. TESTIMONIALS SLIDER
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const btnPrev = document.getElementById('sliderPrev');
  const btnNext = document.getElementById('sliderNext');
  
  let currentSlideIndex = 0;
  let autoplayInterval;

  function showSlide(index) {
    // Bound indices
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activate current
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      showSlide(currentSlideIndex + 1);
    }, 6000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Slide dots click actions
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      stopAutoplay();
      const idx = parseInt(e.target.getAttribute('data-index'));
      showSlide(idx);
      startAutoplay();
    });
  });

  // Slide navigation click actions
  btnPrev.addEventListener('click', () => {
    stopAutoplay();
    showSlide(currentSlideIndex - 1);
    startAutoplay();
  });

  btnNext.addEventListener('click', () => {
    stopAutoplay();
    showSlide(currentSlideIndex + 1);
    startAutoplay();
  });

  // Start initial rotation
  startAutoplay();

  // ==========================================
  // 8. DYNAMIC COUNTDOWN ENGINE
  // ==========================================
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Set target date dynamically: 25 days, 8 hours, 32 mins into the future relative to access
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 25);
  targetDate.setHours(targetDate.getHours() + 8);
  targetDate.setMinutes(targetDate.getMinutes() + 32);

  function updateCountdown() {
    const currentTime = new Date();
    const difference = targetDate - currentTime;
    
    if (difference <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    // Format numbers with leading zeros
    daysEl.textContent = d < 10 ? `0${d}` : d;
    hoursEl.textContent = h < 10 ? `0${h}` : h;
    minutesEl.textContent = m < 10 ? `0${m}` : m;
    secondsEl.textContent = s < 10 ? `0${s}` : s;
  }

  // Update timer every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 9. CONCIERGE DIALOG POPUP & CONTACTS
  // ==========================================
  const floatingCta = document.getElementById('floatingCta');
  const dialogOverlay = document.getElementById('dialogOverlay');
  const dialogClose = document.getElementById('dialogClose');
  const conciergeForm = document.getElementById('conciergeForm');
  const newsletterForm = document.getElementById('newsletterForm');

  function openConciergeDialog() {
    dialogOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeConciergeDialog() {
    dialogOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  floatingCta.addEventListener('click', openConciergeDialog);
  dialogClose.addEventListener('click', closeConciergeDialog);
  dialogOverlay.addEventListener('click', (e) => {
    if (e.target === dialogOverlay) {
      closeConciergeDialog();
    }
  });

  // Concierge Form submission
  conciergeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientName = document.getElementById('cName').value;
    
    showLuxuryToast("Transmitting concierge inquiry securely...");
    
    setTimeout(() => {
      closeConciergeDialog();
      showLuxuryToast(`Thank you, ${clientName}. Registry representative notified.`);
      conciergeForm.reset();
    }, 1200);
  });

  // Newsletter Form submission
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailField = newsletterForm.querySelector('.newsletter-input');
    
    showLuxuryToast("Registering secure subscription...");
    
    setTimeout(() => {
      showLuxuryToast(`Distinguished access granted for ${emailField.value}.`);
      emailField.value = '';
    }, 1000);
  });

  // ==========================================
  // 10. DYNAMIC TOAST DISPATCHER (ALERTS)
  // ==========================================
  function showLuxuryToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'luxury-toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    
    // Auto purge toast after 4s (matching css delay triggers)
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

});
