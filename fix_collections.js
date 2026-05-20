const fs = require('fs');

let html = fs.readFileSync('c:/dryfruitproductwebsite/index.html', 'utf8');

const collectionGridRegex = /<div class="collections-grid">[\s\S]*?<\/section>/;

const newCollections = `<div class="collections-grid">
          
          <!-- Collection Item 1 -->
          <div class="collection-item reveal-on-scroll cursor-hover" onclick="window.location.href='#products'">
            <div class="collection-img-wrapper">
              <div class="premium-card-image">
                <img src="images/premium-festival-box.webp" 
                     alt="The Royal Sovereign Box" 
                     class="collection-img fade-in-img" 
                     width="400" height="600"
                     loading="lazy"
                     decoding="async"
                     onload="initImageLoad(this)"
                     onerror="handleBrokenImage(this)">
              </div>
              <div class="collection-content-overlay">
                <span class="collection-tag">Imperial Tier</span>
                <h3 class="collection-item-title">The Royal Sovereign Box</h3>
                <p class="collection-item-desc">A handcrafted solid dark mahogany box housing almonds, cashews, medjool dates, Aegean valley pistachios, and Persian Saffron jars.</p>
                <a href="#products" onclick="event.stopPropagation()" class="btn btn-gold btn-sm cursor-hover">Reserve Pack</a>
              </div>
            </div>
          </div>

          <!-- Collection Item 2 -->
          <div class="collection-item reveal-on-scroll cursor-hover" onclick="window.location.href='#products'">
            <div class="collection-img-wrapper">
              <div class="premium-card-image">
                <img src="images/luxury-gift-hamper.webp" 
                     alt="The Solstice Velvet Hamper" 
                     class="collection-img fade-in-img" 
                     width="400" height="600"
                     loading="lazy"
                     decoding="async"
                     onload="initImageLoad(this)"
                     onerror="handleBrokenImage(this)">
              </div>
              <div class="collection-content-overlay">
                <span class="collection-tag">Festive Reserve</span>
                <h3 class="collection-item-title">The Solstice Velvet Hamper</h3>
                <p class="collection-item-desc">Draped in emerald-gold royal velvet, containing rare custom-roasted dry fruit selections and honey glaze infusions.</p>
                <a href="#products" onclick="event.stopPropagation()" class="btn btn-gold btn-sm cursor-hover">Reserve Pack</a>
              </div>
            </div>
          </div>

          <!-- Collection Item 3 -->
          <div class="collection-item reveal-on-scroll cursor-hover" onclick="window.location.href='#products'">
            <div class="collection-img-wrapper">
              <div class="premium-card-image">
                <img src="images/silk-road-apothecary.webp" 
                     alt="The Silk Road Apothecary" 
                     class="collection-img fade-in-img" 
                     width="400" height="600"
                     loading="lazy"
                     decoding="async"
                     onload="initImageLoad(this)"
                     onerror="handleBrokenImage(this)">
              </div>
              <div class="collection-content-overlay">
                <span class="collection-tag">Signature Blends</span>
                <h3 class="collection-item-title">The Silk Road Apothecary</h3>
                <p class="collection-item-desc">An artisanal copper casket boasting pure exotic roasted nuts, dry fruits, and delicate volcanic mineral pairings.</p>
                <a href="#products" onclick="event.stopPropagation()" class="btn btn-gold btn-sm cursor-hover">Reserve Pack</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>`;

html = html.replace(collectionGridRegex, newCollections);
fs.writeFileSync('c:/dryfruitproductwebsite/index.html', html);
console.log('Collection grid fixed.');
