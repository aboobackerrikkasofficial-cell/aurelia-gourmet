const fs = require('fs');
let html = fs.readFileSync('c:/dryfruitproductwebsite/index.html', 'utf8');
let css = fs.readFileSync('c:/dryfruitproductwebsite/style.css', 'utf8');

// 1. Add favorite & quick view buttons
html = html.replace(/<div class="product-overlay">/g, `<button class="favorite-btn cursor-hover" onclick="event.preventDefault(); this.classList.toggle('active'); typeof showLuxuryToast === 'function' && showLuxuryToast('Updated private wishlist.')" aria-label="Add to wishlist">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
              <button class="quick-view-btn cursor-hover" onclick="event.preventDefault(); typeof showLuxuryToast === 'function' && showLuxuryToast('Opening product gallery...')">Quick View</button>
              <div class="product-overlay">`);

// 2. Add verified badges to testimonials
html = html.replace(/<p class="author-title">(.*?)<\/p>/g, `<p class="author-title">$1</p>
                  <span class="verified-badge">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Verified Connoisseur
                  </span>`);

// 3. Make collection items clickable links instead of divs
html = html.replace(/<div class="collection-item reveal-on-scroll">/g, '<a href="#products" class="collection-item reveal-on-scroll">');
html = html.replace(/(<\/div>\s*)(<\/div>\s*<\/div>\s*<\/section>)/, '</a>$1$2'); 
html = html.replace(/<\/div>\s*<!-- Collection Item/g, '</a>\n\n          <!-- Collection Item');

fs.writeFileSync('c:/dryfruitproductwebsite/index.html', html);

// CSS Updates
css = css.replace('.star {\r\n  color: var(--accent-gold-bright);\r\n  font-size: 0.8rem;\r\n}', 
`.star {
  color: var(--accent-gold-bright);
  font-size: 0.95rem;
  transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
  cursor: default;
}
.product-rating:hover .star {
  color: #F8D38D;
  text-shadow: 0 0 8px rgba(197, 168, 128, 0.6);
  transform: scale(1.15);
}
.product-rating:hover .star:nth-child(1) { transition-delay: 0s; }
.product-rating:hover .star:nth-child(2) { transition-delay: 0.05s; }
.product-rating:hover .star:nth-child(3) { transition-delay: 0.1s; }
.product-rating:hover .star:nth-child(4) { transition-delay: 0.15s; }
.product-rating:hover .star:nth-child(5) { transition-delay: 0.2s; }
`);
// Handle unix line endings just in case
css = css.replace('.star {\n  color: var(--accent-gold-bright);\n  font-size: 0.8rem;\n}', 
`.star {
  color: var(--accent-gold-bright);
  font-size: 0.95rem;
  transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
  cursor: default;
}
.product-rating:hover .star {
  color: #F8D38D;
  text-shadow: 0 0 8px rgba(197, 168, 128, 0.6);
  transform: scale(1.15);
}
.product-rating:hover .star:nth-child(1) { transition-delay: 0s; }
.product-rating:hover .star:nth-child(2) { transition-delay: 0.05s; }
.product-rating:hover .star:nth-child(3) { transition-delay: 0.1s; }
.product-rating:hover .star:nth-child(4) { transition-delay: 0.15s; }
.product-rating:hover .star:nth-child(5) { transition-delay: 0.2s; }
`);


css = css.replace('.btn-gold:hover {\r\n  background-color: var(--accent-gold-bright);\r\n  box-shadow: 0 6px 20px rgba(197, 168, 128, 0.35);\r\n  transform: translateY(-2px);\r\n}', 
`.btn-gold:hover {
  background-color: var(--accent-gold-bright);
  box-shadow: 0 6px 20px rgba(197, 168, 128, 0.35);
  transform: translateY(-2px);
}
.btn-gold:active, .btn-outline:active, .add-to-cart-icon:active, .favorite-btn:active, .btn:active {
  transform: scale(0.95) !important;
}`);
css = css.replace('.btn-gold:hover {\n  background-color: var(--accent-gold-bright);\n  box-shadow: 0 6px 20px rgba(197, 168, 128, 0.35);\n  transform: translateY(-2px);\n}', 
`.btn-gold:hover {
  background-color: var(--accent-gold-bright);
  box-shadow: 0 6px 20px rgba(197, 168, 128, 0.35);
  transform: translateY(-2px);
}
.btn-gold:active, .btn-outline:active, .add-to-cart-icon:active, .favorite-btn:active, .btn:active {
  transform: scale(0.95) !important;
}`);

css = css.replace('.add-to-cart-icon:hover {\r\n  background-color: var(--accent-gold);\r\n  color: var(--text-dark);\r\n  border-color: var(--accent-gold);\r\n  transform: scale(1.08);\r\n}',
`.add-to-cart-icon:hover {
  background-color: var(--accent-gold);
  color: var(--text-dark);
  border-color: var(--accent-gold);
  transform: scale(1.08);
}
.favorite-btn {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 4;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(18, 18, 19, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(250, 246, 240, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-cream-muted);
  transition: var(--transition-fast);
}
.favorite-btn:hover {
  color: var(--accent-gold-bright);
  transform: scale(1.1);
  border-color: var(--accent-gold);
  background: rgba(18, 18, 19, 0.8);
}
.favorite-btn.active {
  color: #D4AF37;
}
.favorite-btn.active svg {
  fill: #D4AF37;
}
.quick-view-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  z-index: 5;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--accent-gold);
  color: var(--accent-gold-bright);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.product-card:hover .quick-view-btn {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: auto;
}
.quick-view-btn:hover {
  background: var(--accent-gold);
  color: var(--text-dark);
}
.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  color: var(--accent-gold-bright);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: rgba(197, 168, 128, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(197, 168, 128, 0.25);
}`);
css = css.replace('.add-to-cart-icon:hover {\n  background-color: var(--accent-gold);\n  color: var(--text-dark);\n  border-color: var(--accent-gold);\n  transform: scale(1.08);\n}',
`.add-to-cart-icon:hover {
  background-color: var(--accent-gold);
  color: var(--text-dark);
  border-color: var(--accent-gold);
  transform: scale(1.08);
}
.favorite-btn {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 4;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(18, 18, 19, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(250, 246, 240, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-cream-muted);
  transition: var(--transition-fast);
}
.favorite-btn:hover {
  color: var(--accent-gold-bright);
  transform: scale(1.1);
  border-color: var(--accent-gold);
  background: rgba(18, 18, 19, 0.8);
}
.favorite-btn.active {
  color: #D4AF37;
}
.favorite-btn.active svg {
  fill: #D4AF37;
}
.quick-view-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
  z-index: 5;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--accent-gold);
  color: var(--accent-gold-bright);
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.product-card:hover .quick-view-btn {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: auto;
}
.quick-view-btn:hover {
  background: var(--accent-gold);
  color: var(--text-dark);
}
.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  color: var(--accent-gold-bright);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: rgba(197, 168, 128, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(197, 168, 128, 0.25);
}`);

css = css.replace('.pillar-card:hover .pillar-icon-container {\r\n  background: rgba(250, 246, 240, 0.08);\r\n  color: var(--accent-gold-bright);\r\n}',
`.pillar-card:hover .pillar-icon-container {
  background: rgba(197, 168, 128, 0.15);
  color: var(--accent-gold-bright);
  box-shadow: inset 0 0 20px rgba(197, 168, 128, 0.2), 0 0 15px rgba(197, 168, 128, 0.15);
  transform: scale(1.1) rotate(5deg);
}`);
css = css.replace('.pillar-card:hover .pillar-icon-container {\n  background: rgba(250, 246, 240, 0.08);\n  color: var(--accent-gold-bright);\n}',
`.pillar-card:hover .pillar-icon-container {
  background: rgba(197, 168, 128, 0.15);
  color: var(--accent-gold-bright);
  box-shadow: inset 0 0 20px rgba(197, 168, 128, 0.2), 0 0 15px rgba(197, 168, 128, 0.15);
  transform: scale(1.1) rotate(5deg);
}`);

css = css.replace('.pillar-icon-container {\r\n  width: 60px;\r\n  height: 60px;\r\n  border-radius: 12px;\r\n  background: rgba(197, 168, 128, 0.05);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--accent-gold);\r\n  margin-bottom: 1.5rem;\r\n  transition: var(--transition-fast);\r\n}',
`.pillar-icon-container {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(197, 168, 128, 0.05);
  box-shadow: inset 0 0 10px rgba(197, 168, 128, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}`);
css = css.replace('.pillar-icon-container {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  background: rgba(197, 168, 128, 0.05);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--accent-gold);\n  margin-bottom: 1.5rem;\n  transition: var(--transition-fast);\n}',
`.pillar-icon-container {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(197, 168, 128, 0.05);
  box-shadow: inset 0 0 10px rgba(197, 168, 128, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}`);

fs.writeFileSync('c:/dryfruitproductwebsite/style.css', css);
console.log('Modifications applied.');
