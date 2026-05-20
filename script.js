/* -------------------------------------------------------------
 * AURELIA GOURMET - LUXURY DRY FRUITS BRAND
 * CORE INTERACTIVE ENGINE (VANILLA JAVASCRIPT)
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

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

  // ==========================================
  // 11. WISHLIST SYSTEM
  // ==========================================
  
  // State
  let wishlistState = [];

  // DOM Elements
  const wishlistBadge = document.getElementById('wishlistBadge');
  const wishlistTrigger = document.getElementById('wishlistTrigger');
  const wishlistDrawerOverlay = document.getElementById('wishlistDrawerOverlay');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
  const wishlistExploreBtn = document.getElementById('wishlistExploreBtn');
  const wishlistItemsList = document.getElementById('wishlistItemsList');
  const wishlistEmptyMessage = document.getElementById('wishlistEmptyMessage');

  // Functions
  function loadWishlist() {
    try {
      const stored = localStorage.getItem('aurelia_wishlist_full');
      if (stored) {
        wishlistState = JSON.parse(stored);
      } else {
        // Migration from old ID-only wishlist
        const oldStored = localStorage.getItem('aurelia_wishlist');
        if (oldStored) {
           const ids = JSON.parse(oldStored);
           // We can't recover full details easily without querying DOM, so clear it out for a fresh start.
           wishlistState = [];
           localStorage.removeItem('aurelia_wishlist');
        }
      }
    } catch (e) {
      wishlistState = [];
    }
  }

  function saveWishlist() {
    localStorage.setItem('aurelia_wishlist_full', JSON.stringify(wishlistState));
  }

  function updateWishlistCounter() {
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlistState.length;
      wishlistBadge.classList.add('pulse');
      setTimeout(() => wishlistBadge.classList.remove('pulse'), 300);
    }
    syncHeartIcons();
  }

  function syncHeartIcons() {
    // Find all favorite buttons and sync their visual state
    const allFavBtns = document.querySelectorAll('.favorite-btn');
    allFavBtns.forEach(btn => {
      // Look for closest product card
      const card = btn.closest('[data-product-id]');
      if (!card) return;
      
      const id = card.getAttribute('data-product-id');
      const inWishlist = wishlistState.some(item => item.id === id);
      
      const svg = btn.querySelector('svg');
      if (inWishlist) {
        btn.classList.add('active');
        if (svg) {
          svg.style.fill = '#D4AF37';
          svg.style.stroke = '#D4AF37';
        }
      } else {
        btn.classList.remove('active');
        if (svg) {
          svg.style.fill = 'none';
          svg.style.stroke = 'currentColor';
        }
      }
    });
  }

  function renderWishlist() {
    if (!wishlistItemsList || !wishlistEmptyMessage) return;
    
    wishlistItemsList.innerHTML = '';
    
    if (wishlistState.length === 0) {
      wishlistEmptyMessage.style.display = 'flex';
      wishlistItemsList.style.display = 'none';
    } else {
      wishlistEmptyMessage.style.display = 'none';
      wishlistItemsList.style.display = 'flex';
      
      wishlistState.forEach(prod => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div style="width: 75px; height: 75px; border-radius: var(--border-radius-sm); border: 1px solid rgba(197, 168, 128, 0.15); flex-shrink: 0; overflow: hidden;">
            <img src="${prod.img}" alt="${prod.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="cart-item-info" style="flex-grow: 1;">
            <h4 class="cart-item-name">${prod.name}</h4>
            <span class="cart-item-price">${prod.price}</span>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:5px;">
              <span class="cart-item-remove-btn cursor-hover remove-wishlist-item" data-id="${prod.id}">Remove</span>
              <button class="btn btn-gold btn-sm cursor-hover add-to-cart-from-wishlist" data-id="${prod.id}" data-name="${prod.name}" data-price="${prod.price}" data-img="${prod.img}" style="padding: 0.3rem 0.8rem; font-size: 0.6rem;">Add to Bag</button>
            </div>
          </div>
        `;
        wishlistItemsList.appendChild(li);
      });
    }
  }

  function addToWishlist(productObj) {
    if (!wishlistState.some(item => item.id === productObj.id)) {
      wishlistState.push(productObj);
      saveWishlist();
      updateWishlistCounter();
      renderWishlist();
      if(typeof showLuxuryToast === 'function') showLuxuryToast('Added to private wishlist.');
    }
  }

  function removeFromWishlist(id) {
    wishlistState = wishlistState.filter(item => item.id !== id);
    saveWishlist();
    updateWishlistCounter();
    renderWishlist();
    if(typeof showLuxuryToast === 'function') showLuxuryToast('Removed from private wishlist.');
  }

  // Initialization
  loadWishlist();
  updateWishlistCounter();
  renderWishlist();

  // Bind Drawer Open/Close
  if (wishlistTrigger) {
    wishlistTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      wishlistDrawerOverlay.classList.add('open');
      wishlistDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderWishlist();
    });
  }

  function closeWishlistDrawerFn() {
    if (wishlistDrawerOverlay) wishlistDrawerOverlay.classList.remove('open');
    if (wishlistDrawer) wishlistDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (wishlistCloseBtn) wishlistCloseBtn.addEventListener('click', closeWishlistDrawerFn);
  if (wishlistDrawerOverlay) wishlistDrawerOverlay.addEventListener('click', closeWishlistDrawerFn);
  if (wishlistExploreBtn) {
    wishlistExploreBtn.addEventListener('click', () => {
      closeWishlistDrawerFn();
      window.location.href = '#products';
    });
  }

  // Drawer Interactions (Remove & Add to Cart)
  if (wishlistItemsList) {
    wishlistItemsList.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.remove-wishlist-item');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-id');
        removeFromWishlist(id);
      }
      
      const addToCartBtn = e.target.closest('.add-to-cart-from-wishlist');
      if (addToCartBtn) {
        const id = addToCartBtn.getAttribute('data-id');
        const name = addToCartBtn.getAttribute('data-name');
        const price = parseFloat(addToCartBtn.getAttribute('data-price'));
        const img = addToCartBtn.getAttribute('data-img');
        
        if (typeof addToCart === 'function') {
          closeWishlistDrawerFn();
          addToCart(id, name, price, img);
        }
      }
    });
  }

  // Heart Icon Click Delegation (The actual trigger)
  // Ensure we remove old listeners and only use this robust one
  document.body.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-btn');
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();
      
      const card = favBtn.closest('[data-product-id]');
      if (!card) {
        console.error("Wishlist button clicked but no data-product-id found on ancestor element.");
        return;
      }
      
      const productObj = {
        id: card.getAttribute('data-product-id'),
        name: card.getAttribute('data-product-name'),
        price: card.getAttribute('data-product-price'),
        img: card.getAttribute('data-product-image'),
        rating: card.getAttribute('data-product-rating')
      };
      
      const isInWishlist = wishlistState.some(item => item.id === productObj.id);
      
      if (isInWishlist) {
        removeFromWishlist(productObj.id);
      } else {
        addToWishlist(productObj);
      }
    }
  });

  // 12. RATING SYSTEM UPGRADE
  // ==========================================
  const ratingContainers = document.querySelectorAll('.product-rating');
  ratingContainers.forEach(container => {
    const stars = container.querySelectorAll('.interactive-star');
    const numEl = container.querySelector('.rating-num');
    
    // Animate review count
    if (numEl) {
      const targetCount = parseInt(numEl.getAttribute('data-count') || 0);
      let count = 0;
      const step = Math.ceil(targetCount / 30);
      const counterInterval = setInterval(() => {
        count += step;
        if (count >= targetCount) {
          count = targetCount;
          clearInterval(counterInterval);
        }
        numEl.textContent = `(${count})`;
      }, 50);
    }

    // Star interaction
    stars.forEach((star, index) => {
      star.style.cursor = 'pointer';
      
      star.addEventListener('click', () => {
        showLuxuryToast('Thank you for rating this masterpiece.');
        stars.forEach((s, i) => {
          if (i <= index) {
            s.style.color = '#D4AF37';
            s.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.8)';
          } else {
            s.style.color = 'var(--text-cream-muted)';
            s.style.textShadow = 'none';
          }
        });
      });
      
      star.addEventListener('mouseenter', () => {
        stars.forEach((s, i) => {
          if (i <= index) s.style.transform = 'scale(1.2)';
          else s.style.transform = 'scale(1)';
        });
      });
      
      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.style.transform = 'scale(1)');
      });
    });
  });

  // ==========================================
  // 13. QUICK VIEW MODAL
  // ==========================================
  const qvOverlay = document.getElementById('quickViewOverlay');
  const qvModal = document.getElementById('quickViewModal');
  const qvCloseBtn = document.getElementById('quickViewCloseBtn');
  
  const qvImage = document.getElementById('qvImage');
  const qvTitle = document.getElementById('qvTitle');
  const qvDesc = document.getElementById('qvDesc');
  const qvOrigin = document.getElementById('qvOrigin');
  const qvPrice = document.getElementById('qvPrice');
  const qvRating = document.getElementById('qvRating');
  
  const qvAddToCartBtn = document.getElementById('qvAddToCartBtn');
  const qvWishlistBtn = document.getElementById('qvWishlistBtn');
  const qvWishlistIcon = document.getElementById('qvWishlistIcon');
  
  let currentQvId = null;

  function openQuickView(id) {
    const prod = productDB[id];
    if (!prod) return;
    
    currentQvId = id;
    qvImage.src = prod.img;
    qvTitle.textContent = prod.name;
    qvPrice.textContent = `$${prod.price.toFixed(2)}`;
    
    // Simulate some realistic descriptions/origins if not in DB
    const descMap = {
      '1': 'Colossal grade-size nonpareil almonds with a buttery, crisp texture and absolute sweetness.',
      '2': 'Whole white colossal-size cashews, delicately dry-roasted to preserve their ultra-creamy rich oils.',
      '3': 'Vibrant green kernels, lightly cured in pink Himalayan salt and Persian saffron essence.',
      '4': 'Premium light halves, bursting with essential brain-boosting rich omega-3 oils and pure earthy notes.',
      '5': 'Massive, luscious crown-jewel dates with a caramelized, rich melt-in-your-mouth luxury texture.',
      '6': 'Pure Grade-A Sargol threads with intense gold coloration power and exquisite aromatic luxury profile.'
    };
    
    const originMap = {
      '1': 'Estates of California',
      '2': 'Vietnam Highlands',
      '3': 'Sovereign Aegean Valley',
      '4': 'Kashmir High Slopes',
      '5': 'Jordan Valley',
      '6': 'Estates of Kashan'
    };
    
    qvDesc.textContent = descMap[id] || 'Exclusive luxury reserve product.';
    qvOrigin.textContent = originMap[id] || 'Sovereign Estate';
    
    // Update Wishlist button state in modal
    updateQvWishlistState();
    
    qvOverlay.classList.add('open');
    qvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    qvOverlay.classList.remove('open');
    qvModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateQvWishlistState() {
    if (!currentQvId || !qvWishlistIcon) return;
    if (wishlist.includes(currentQvId)) {
      qvWishlistIcon.style.fill = '#D4AF37';
      qvWishlistIcon.style.stroke = '#D4AF37';
      qvWishlistBtn.style.borderColor = '#D4AF37';
    } else {
      qvWishlistIcon.style.fill = 'none';
      qvWishlistIcon.style.stroke = 'currentColor';
      qvWishlistBtn.style.borderColor = 'var(--accent-gold)';
    }
  }

  if (qvCloseBtn) qvCloseBtn.addEventListener('click', closeQuickView);
  if (qvOverlay) qvOverlay.addEventListener('click', closeQuickView);
  
  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      if (typeof closeWishlistDrawer === 'function') closeWishlistDrawer();
      if (typeof closeCartDrawer === 'function') closeCartDrawer();
    }
  });

  if (qvAddToCartBtn) {
    qvAddToCartBtn.addEventListener('click', () => {
      const prod = productDB[currentQvId];
      if (prod) {
        closeQuickView();
        addToCart(currentQvId, prod.name, prod.price, prod.img);
      }
    });
  }

  if (qvWishlistBtn) {
    qvWishlistBtn.addEventListener('click', () => {
      if (!currentQvId) return;
      if (wishlist.includes(currentQvId)) {
        wishlist = wishlist.filter(item => item !== currentQvId);
        showLuxuryToast('Removed from private wishlist.');
      } else {
        wishlist.push(currentQvId);
        showLuxuryToast('Added to private wishlist.');
      }
      localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
      updateWishlistUI();
      updateQvWishlistState();
    });
  }

  // Bind Quick View Buttons dynamically
  document.body.addEventListener('click', (e) => {
    const qvBtn = e.target.closest('.quick-view-btn');
    if (qvBtn) {
      e.preventDefault();
      e.stopPropagation();
      // Need to find ID. Since the btn doesn't have ID, we find the closest product card
      // In HTML, the add to cart button has data-id. Let's find it.
      const overlay = qvBtn.nextElementSibling; // product-overlay
      let id = null;
      if (overlay) {
        const addBtn = overlay.querySelector('.btn-quick-add');
        if (addBtn) id = addBtn.getAttribute('data-id');
      }
      if (id) {
        openQuickView(id);
      } else {
        // Fallback: look around
        const container = qvBtn.closest('.premium-card-image');
        if (container) {
          const addBtn = container.querySelector('.btn-quick-add');
          if (addBtn) id = addBtn.getAttribute('data-id');
        }
        if (id) openQuickView(id);
      }
    }
  });

  
