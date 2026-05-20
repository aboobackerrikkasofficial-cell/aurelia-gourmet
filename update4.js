const fs = require('fs');

let html = fs.readFileSync('c:/dryfruitproductwebsite/index.html', 'utf8');
let js = fs.readFileSync('c:/dryfruitproductwebsite/script.js', 'utf8');

// Add data-id to favorite buttons
for (let i = 1; i <= 6; i++) {
  html = html.replace(
    /class="favorite-btn cursor-hover" onclick="event.preventDefault\(\); this.classList.toggle\('active'\); typeof showLuxuryToast === 'function' && showLuxuryToast\('Updated private wishlist.'\)" aria-label="Add to wishlist"/,
    `class="favorite-btn cursor-hover" data-id="${i}" aria-label="Add to wishlist"`
  );
}

// Ensure wishlist icon in header
if (!html.includes('wishlistTrigger')) {
  html = html.replace(
    /<button class="cart-trigger cursor-hover" id="cartTrigger" aria-label="Shopping Bag">/,
    `<button class="cart-trigger cursor-hover wishlist-trigger" id="wishlistTrigger" aria-label="Wishlist" style="margin-right: 15px;">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span class="cart-badge wishlist-badge" id="wishlistBadge">0</span>
        </button>
        <button class="cart-trigger cursor-hover" id="cartTrigger" aria-label="Shopping Bag">`
  );
}

// Add Rating Interaction & Animated Counts classes
html = html.replace(/<span class="rating-num">\((.*?)\)<\/span>/g, '<span class="rating-num" data-count="$1">(0)</span>');
// Add data-value to stars
for (let i = 1; i <= 5; i++) {
  html = html.replace(/<span class="star">&#9733;<\/span>/g, (match) => {
    return `<span class="star interactive-star">&#9733;</span>`;
  });
}
// Actually, let's just make sure stars have the class 'interactive-star'
html = html.replace(/<span class="star">/g, '<span class="star interactive-star">');

// Add JS for Wishlist and Ratings
const wishlistAndRatingJS = `
  // ==========================================
  // 11. WISHLIST SYSTEM
  // ==========================================
  let wishlist = JSON.parse(localStorage.getItem('aurelia_wishlist') || '[]');
  const wishlistBadge = document.getElementById('wishlistBadge');
  const favoriteBtns = document.querySelectorAll('.favorite-btn');

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
        btn.querySelector('svg').style.fill = '#D4AF37';
        btn.querySelector('svg').style.stroke = '#D4AF37';
      } else {
        btn.classList.remove('active');
        btn.querySelector('svg').style.fill = 'none';
        btn.querySelector('svg').style.stroke = 'currentColor';
      }
    });
  }

  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
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
        numEl.textContent = \`(\${count})\`;
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
`;

if (!js.includes('11. WISHLIST SYSTEM')) {
  js += wishlistAndRatingJS;
}

fs.writeFileSync('c:/dryfruitproductwebsite/index.html', html);
fs.writeFileSync('c:/dryfruitproductwebsite/script.js', js);
console.log('Update 4 applied.');
