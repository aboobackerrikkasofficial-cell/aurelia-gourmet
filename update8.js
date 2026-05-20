const fs = require('fs');

let html = fs.readFileSync('c:/dryfruitproductwebsite/index.html', 'utf8');
let js = fs.readFileSync('c:/dryfruitproductwebsite/script.js', 'utf8');

// 1. Update index.html
const cardData = [
  { id: '1', name: 'California Gold Almonds', price: '45.00', img: 'images/california-gold-almonds.webp', rating: '5.0', comment: 'Card 1: Almonds' },
  { id: '2', name: 'Velvet Ivory Cashews', price: '55.00', img: 'images/velvet-ivory-cashews.webp', rating: '5.0', comment: 'Card 2: Cashews' },
  { id: '3', name: 'Emperor Pistachios', price: '62.00', img: 'images/emperor-pistachios.webp', rating: '5.0', comment: 'Card 3: Pistachios' },
  { id: '4', name: 'Himalayan Walnut Reserve', price: '68.00', img: 'images/himalayan-walnut-reserve.webp', rating: '5.0', comment: 'Card 4: Walnuts' },
  { id: '5', name: 'Royal Medjool Dates', price: '75.00', img: 'images/royal-medjool-dates.webp', rating: '5.0', comment: 'Card 5: Dates' },
  { id: '6', name: 'Imperial Saffron Collection', price: '120.00', img: 'images/imperial-saffron-collection.webp', rating: '5.0', comment: 'Card 6: Saffron' }
];

cardData.forEach(card => {
  const searchStr = `<!-- ${card.comment} -->\n          <div class="product-card reveal-on-scroll">`;
  const replaceStr = `<!-- ${card.comment} -->\n          <div class="product-card reveal-on-scroll" data-product-id="${card.id}" data-product-name="${card.name}" data-product-price="${card.price}" data-product-image="${card.img}" data-product-rating="${card.rating}">`;
  html = html.replace(searchStr, replaceStr);
});

// Also add to collections just in case
const collections = [
  { id: '7', name: 'The Royal Sovereign Box', price: '250.00', img: 'images/premium-festival-box.webp', rating: '5.0', comment: 'Collection Item 1' },
  { id: '8', name: 'The Solstice Velvet Hamper', price: '185.00', img: 'images/luxury-gift-hamper.webp', rating: '5.0', comment: 'Collection Item 2' },
  { id: '9', name: 'The Silk Road Apothecary', price: '320.00', img: 'images/silk-road-apothecary.webp', rating: '5.0', comment: 'Collection Item 3' }
];

collections.forEach(card => {
  const searchStr = `<!-- ${card.comment} -->\n          <div class="collection-item reveal-on-scroll cursor-hover" onclick="window.location.href='#products'">`;
  const replaceStr = `<!-- ${card.comment} -->\n          <div class="collection-item reveal-on-scroll cursor-hover" onclick="window.location.href='#products'" data-product-id="${card.id}" data-product-name="${card.name}" data-product-price="${card.price}" data-product-image="${card.img}" data-product-rating="${card.rating}">`;
  html = html.replace(searchStr, replaceStr);
});


// 2. Completely replace Wishlist System in script.js
// Find the block from "// 11. WISHLIST SYSTEM" to "// 12. RATING SYSTEM UPGRADE"
const jsWishlistRegex = /\/\/ 11\. WISHLIST SYSTEM[\s\S]*?(?=\/\/ 12\. RATING SYSTEM UPGRADE)/;

const newWishlistSystem = `// 11. WISHLIST SYSTEM
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
        li.innerHTML = \`
          <div style="width: 75px; height: 75px; border-radius: var(--border-radius-sm); border: 1px solid rgba(197, 168, 128, 0.15); flex-shrink: 0; overflow: hidden;">
            <img src="\${prod.img}" alt="\${prod.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="cart-item-info" style="flex-grow: 1;">
            <h4 class="cart-item-name">\${prod.name}</h4>
            <span class="cart-item-price">$\${prod.price}</span>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:5px;">
              <span class="cart-item-remove-btn cursor-hover remove-wishlist-item" data-id="\${prod.id}">Remove</span>
              <button class="btn btn-gold btn-sm cursor-hover add-to-cart-from-wishlist" data-id="\${prod.id}" data-name="\${prod.name}" data-price="\${prod.price}" data-img="\${prod.img}" style="padding: 0.3rem 0.8rem; font-size: 0.6rem;">Add to Bag</button>
            </div>
          </div>
        \`;
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

  `;

// Also, the Quick View Modal code had a separate event listener that duplicated favorite-btn logic.
// We should remove that duplicate from script.js
const duplicateFavBtnLogicRegex = /\/\/ Re-bind favorite buttons using event delegation to prevent cloning issues[\s\S]*?\}\);/m;

if (jsWishlistRegex.test(js)) {
  js = js.replace(jsWishlistRegex, newWishlistSystem);
  js = js.replace(duplicateFavBtnLogicRegex, ''); // clear out the duplicate logic I added in previous step
} else {
  console.log("Could not find wishlist block in script.js to replace!");
}

fs.writeFileSync('c:/dryfruitproductwebsite/index.html', html);
fs.writeFileSync('c:/dryfruitproductwebsite/script.js', js);
console.log('Update 8 applied.');
