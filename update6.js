const fs = require('fs');

let html = fs.readFileSync('c:/dryfruitproductwebsite/index.html', 'utf8');
let css = fs.readFileSync('c:/dryfruitproductwebsite/style.css', 'utf8');
let js = fs.readFileSync('c:/dryfruitproductwebsite/script.js', 'utf8');

// 1. Add Wishlist Drawer HTML
const wishlistDrawerHtml = `
  <!-- WISHLIST DRAWER OVERLAY -->
  <div class="cart-overlay" id="wishlistDrawerOverlay"></div>
  <div class="cart-drawer" id="wishlistDrawer">
    <div class="cart-drawer-header">
      <h3 class="cart-drawer-title">Private Wishlist</h3>
      <button class="cart-close-btn cursor-hover" id="wishlistCloseBtn" aria-label="Close Wishlist">&times;</button>
    </div>
    
    <div class="cart-drawer-body">
      <div class="cart-empty-message" id="wishlistEmptyMessage">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#FAF6F0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <p>Your private wishlist is empty.</p>
        <button class="btn btn-gold btn-sm cursor-hover" id="wishlistExploreBtn" style="margin-top: 15px;">Explore Reserves</button>
      </div>
      
      <ul class="cart-items-list" id="wishlistItemsList">
        <!-- Rendered dynamically via JS -->
      </ul>
    </div>
  </div>

  <!-- CONCIERGE INQUIRY DIALOG (POPUP) -->`;

if (!html.includes('wishlistDrawerOverlay')) {
  html = html.replace('<!-- CONCIERGE INQUIRY DIALOG (POPUP) -->', wishlistDrawerHtml);
}

// Ensure the wishlist icon trigger opens the drawer
// Look for id="wishlistTrigger" we added previously.
// Add pointer-events to favorite-btn just in case
if (!css.includes('.favorite-btn { pointer-events: auto;')) {
  css += `
.favorite-btn {
  pointer-events: auto !important;
  z-index: 20 !important;
}
.wishlist-add-to-cart {
  margin-top: 10px;
  width: 100%;
}
.cart-item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
`;
}

// 2. Add Wishlist logic to JS
// We need to replace the old wishlist logic block.
const jsReplaceRegex = /\/\/ 11\. WISHLIST SYSTEM[\s\S]*?(?=\/\/ 12\. RATING SYSTEM UPGRADE)/;
const newJs = `// 11. WISHLIST SYSTEM
  // ==========================================
  let wishlist = JSON.parse(localStorage.getItem('aurelia_wishlist') || '[]');
  const wishlistBadge = document.getElementById('wishlistBadge');
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  const wishlistTrigger = document.getElementById('wishlistTrigger');
  const wishlistDrawerOverlay = document.getElementById('wishlistDrawerOverlay');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
  const wishlistExploreBtn = document.getElementById('wishlistExploreBtn');
  const wishlistItemsList = document.getElementById('wishlistItemsList');
  const wishlistEmptyMessage = document.getElementById('wishlistEmptyMessage');

  // Hardcoded product database for the wishlist since we don't have a backend
  const productDB = {
    '1': { name: 'California Gold Almonds', price: 45.00, img: 'images/california-gold-almonds.webp' },
    '2': { name: 'Velvet Ivory Cashews', price: 55.00, img: 'images/velvet-ivory-cashews.webp' },
    '3': { name: 'Emperor Pistachios', price: 62.00, img: 'images/emperor-pistachios.webp' },
    '4': { name: 'Himalayan Walnut Reserve', price: 68.00, img: 'images/himalayan-walnut-reserve.webp' },
    '5': { name: 'Royal Medjool Dates', price: 75.00, img: 'images/royal-medjool-dates.webp' },
    '6': { name: 'Imperial Saffron Collection', price: 120.00, img: 'images/imperial-saffron-collection.webp' }
  };

  function updateWishlistUI() {
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlist.length;
      wishlistBadge.classList.add('pulse');
      setTimeout(() => wishlistBadge.classList.remove('pulse'), 300);
    }
    
    favoriteBtns.forEach(btn => {
      const id = btn.getAttribute('data-id');
      if (wishlist.includes(id)) {
        btn.classList.add('active');
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.style.fill = '#D4AF37';
          svg.style.stroke = '#D4AF37';
        }
      } else {
        btn.classList.remove('active');
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.style.fill = 'none';
          svg.style.stroke = 'currentColor';
        }
      }
    });

    renderWishlistDrawer();
  }

  function renderWishlistDrawer() {
    if (!wishlistItemsList) return;
    
    if (wishlist.length === 0) {
      wishlistEmptyMessage.style.display = 'flex';
      wishlistItemsList.style.display = 'none';
    } else {
      wishlistEmptyMessage.style.display = 'none';
      wishlistItemsList.style.display = 'flex';
      
      wishlistItemsList.innerHTML = '';
      wishlist.forEach(id => {
        const prod = productDB[id];
        if (!prod) return;
        
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = \`
          <div style="width: 75px; height: 75px; border-radius: var(--border-radius-sm); border: 1px solid rgba(197, 168, 128, 0.15); flex-shrink: 0; overflow: hidden;">
            <img src="\${prod.img}" alt="\${prod.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="cart-item-info" style="flex-grow: 1;">
            <h4 class="cart-item-name">\${prod.name}</h4>
            <span class="cart-item-price">$\${prod.price.toFixed(2)}</span>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:5px;">
              <span class="cart-item-remove-btn cursor-hover remove-wishlist-item" data-id="\${id}">Remove</span>
              <button class="btn btn-gold btn-sm cursor-hover add-to-cart-from-wishlist" data-id="\${id}" data-name="\${prod.name}" data-price="\${prod.price}" data-img="\${prod.img}" style="padding: 0.3rem 0.8rem; font-size: 0.6rem;">Add to Bag</button>
            </div>
          </div>
        \`;
        wishlistItemsList.appendChild(li);
      });
      bindCursorHoverTriggers();
    }
  }

  function openWishlistDrawer() {
    wishlistDrawerOverlay.classList.add('open');
    wishlistDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlistDrawer() {
    wishlistDrawerOverlay.classList.remove('open');
    wishlistDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (wishlistTrigger) wishlistTrigger.addEventListener('click', openWishlistDrawer);
  if (wishlistCloseBtn) wishlistCloseBtn.addEventListener('click', closeWishlistDrawer);
  if (wishlistDrawerOverlay) wishlistDrawerOverlay.addEventListener('click', closeWishlistDrawer);
  if (wishlistExploreBtn) {
    wishlistExploreBtn.addEventListener('click', () => {
      closeWishlistDrawer();
      window.location.href = '#products';
    });
  }

  // Wishlist Drawer Actions (Remove / Add to Cart)
  if (wishlistItemsList) {
    wishlistItemsList.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.remove-wishlist-item');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-id');
        wishlist = wishlist.filter(item => item !== id);
        localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
        showLuxuryToast('Removed from private wishlist.');
      }
      
      const addToCartBtn = e.target.closest('.add-to-cart-from-wishlist');
      if (addToCartBtn) {
        const id = addToCartBtn.getAttribute('data-id');
        const name = addToCartBtn.getAttribute('data-name');
        const price = parseFloat(addToCartBtn.getAttribute('data-price'));
        const img = addToCartBtn.getAttribute('data-img');
        
        if (typeof addToCart === 'function') {
          closeWishlistDrawer();
          addToCart(id, name, price, img);
        }
      }
    });
  }

  // Add click listeners to favorite buttons robustly
  favoriteBtns.forEach(btn => {
    // Remove old listeners if any by replacing node
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent opening product link if any
      const id = newBtn.getAttribute('data-id');
      if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        showLuxuryToast('Removed from private wishlist.');
      } else {
        wishlist.push(id);
        showLuxuryToast('Added to private wishlist.');
      }
      localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
      updateWishlistUI();
    });
  });

  updateWishlistUI();

  // ==========================================
  `;

if (jsReplaceRegex.test(js)) {
  js = js.replace(jsReplaceRegex, newJs);
} else {
  // Fallback if not found
  console.log("Could not find wishlist block in script.js to replace!");
}

fs.writeFileSync('c:/dryfruitproductwebsite/index.html', html);
fs.writeFileSync('c:/dryfruitproductwebsite/style.css', css);
fs.writeFileSync('c:/dryfruitproductwebsite/script.js', js);
console.log('Update 6 applied.');
