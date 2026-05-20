const fs = require('fs');

let html = fs.readFileSync('c:/dryfruitproductwebsite/index.html', 'utf8');
let css = fs.readFileSync('c:/dryfruitproductwebsite/style.css', 'utf8');
let js = fs.readFileSync('c:/dryfruitproductwebsite/script.js', 'utf8');

// 1. Add Quick View Modal HTML to index.html
const quickViewModalHtml = `
  <!-- QUICK VIEW MODAL OVERLAY -->
  <div class="cart-overlay" id="quickViewOverlay" style="z-index: 100001;"></div>
  <div class="quick-view-modal" id="quickViewModal">
    <button class="cart-close-btn cursor-hover" id="quickViewCloseBtn" aria-label="Close Quick View" style="position: absolute; top: 1.5rem; right: 1.5rem; z-index: 10;">&times;</button>
    <div class="quick-view-content">
      <div class="quick-view-img-container">
        <img src="" id="qvImage" alt="Product" class="img-fluid" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div class="quick-view-details">
        <span class="product-origin" id="qvOrigin">Estates</span>
        <h2 class="quick-view-title" id="qvTitle">Product Name</h2>
        <div class="product-rating" style="margin-bottom: 1rem;">
          <span class="star" style="color: #D4AF37;">&#9733;</span>
          <span class="star" style="color: #D4AF37;">&#9733;</span>
          <span class="star" style="color: #D4AF37;">&#9733;</span>
          <span class="star" style="color: #D4AF37;">&#9733;</span>
          <span class="star" style="color: #D4AF37;">&#9733;</span>
          <span class="rating-num" id="qvRating">(100)</span>
        </div>
        <p class="quick-view-desc" id="qvDesc">Description</p>
        <div class="quick-view-status">
          <span style="color: #2E8B57; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;">In Stock - Ready for Dispatch</span>
        </div>
        <div class="quick-view-price-row">
          <span class="product-price" id="qvPrice">$0.00</span>
        </div>
        <div class="quick-view-actions">
          <button class="btn btn-gold cursor-hover" id="qvAddToCartBtn" style="flex: 1;">Add to Bag</button>
          <button class="btn btn-outline cursor-hover" id="qvWishlistBtn" style="padding: 0.85rem 1.2rem;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="qvWishlistIcon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

if (!html.includes('quickViewModal')) {
  html = html.replace('<!-- WISHLIST DRAWER OVERLAY -->', quickViewModalHtml + '\n  <!-- WISHLIST DRAWER OVERLAY -->');
}

// 2. Add Quick View CSS
if (!css.includes('.quick-view-modal')) {
  css += `
/* Quick View Modal Styles */
.quick-view-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  width: 90%;
  max-width: 900px;
  background: var(--bg-deep-charcoal);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  z-index: 100002;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.8);
}
.quick-view-modal.open {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}
.quick-view-content {
  display: flex;
  height: 500px;
}
.quick-view-img-container {
  flex: 1;
  background: var(--bg-matte-black);
}
.quick-view-details {
  flex: 1;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
}
.quick-view-title {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: var(--accent-gold-bright);
}
.quick-view-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-cream-muted);
  margin-bottom: 2rem;
  flex-grow: 1;
}
.quick-view-status {
  margin-bottom: 1.5rem;
}
.quick-view-price-row {
  margin-bottom: 2rem;
}
.quick-view-actions {
  display: flex;
  gap: 1rem;
}

/* Ensure product overlay doesn't block clicks */
.product-overlay {
  pointer-events: none !important;
}
.product-overlay .btn {
  pointer-events: auto !important;
}

@media (max-width: 768px) {
  .quick-view-content {
    flex-direction: column;
    height: auto;
    max-height: 85vh;
    overflow-y: auto;
  }
  .quick-view-img-container {
    height: 300px;
    flex: none;
  }
  .quick-view-details {
    padding: 2rem 1.5rem;
  }
}
`;
}

// 3. Update JS for Quick View and fix Wishlist binding
// We'll append the Quick View JS. We also need to fix the favorite-btn listeners if they were overridden.
const jsQuickView = `
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
    qvPrice.textContent = \`$\${prod.price.toFixed(2)}\`;
    
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

  // Re-bind favorite buttons using event delegation to prevent cloning issues
  document.body.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-btn');
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = favBtn.getAttribute('data-id');
      if (!id) return;
      
      if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        showLuxuryToast('Removed from private wishlist.');
      } else {
        wishlist.push(id);
        showLuxuryToast('Added to private wishlist.');
      }
      localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
      updateWishlistUI();
    }
  });
`;

if (!js.includes('13. QUICK VIEW MODAL')) {
  js += jsQuickView;
}

// Remove the old cloning loop to avoid duplicates, since we added event delegation
js = js.replace(/favoriteBtns\.forEach\(btn => \{[\s\S]*?\}\);\s*updateWishlistUI\(\);/m, 'updateWishlistUI();');

// Also update index.html to ensure quick-view-btn doesn't have old onclick attribute
html = html.replace(/onclick="event\.preventDefault\(\); typeof showLuxuryToast === 'function' && showLuxuryToast\('Opening product gallery\.\.\.'\)"/g, '');

fs.writeFileSync('c:/dryfruitproductwebsite/index.html', html);
fs.writeFileSync('c:/dryfruitproductwebsite/style.css', css);
fs.writeFileSync('c:/dryfruitproductwebsite/script.js', js);
console.log('Update 7 applied.');
