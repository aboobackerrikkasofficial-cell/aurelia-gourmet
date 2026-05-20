const fs = require('fs');

let html = fs.readFileSync('c:/dryfruitproductwebsite/index.html', 'utf8');
let css = fs.readFileSync('c:/dryfruitproductwebsite/style.css', 'utf8');
let js = fs.readFileSync('c:/dryfruitproductwebsite/script.js', 'utf8');

// 1. Social Links fix
html = html.replace(/href="#" class="social-icon/g, 'href="#" onclick="event.preventDefault(); typeof showLuxuryToast === \'function\' && showLuxuryToast(\'Connecting to secure social gateway...\')" class="social-icon');
html = html.replace(/href="#" class="policy-link/g, 'href="#" onclick="event.preventDefault(); typeof showLuxuryToast === \'function\' && showLuxuryToast(\'Opening secure document...\')" class="policy-link');

// 2. Remove dead code / duplicate comment in script.js
js = js.replace(/\/\/ 0\. CACHED IMAGE RECOVERY SCANNER[\s\S]*?\/\/ ==========================================\n\s*\/\/ ==========================================\n/m, '// ==========================================\n');

// 3. Mobile touch targets
css += `
/* Accessibility & Touch Targets */
@media (max-width: 768px) {
  .nav-link, .btn, .social-icon, .mobile-nav-link, .footer-link, .policy-link, .qty-btn, .add-to-cart-icon {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
`;

fs.writeFileSync('c:/dryfruitproductwebsite/index.html', html);
fs.writeFileSync('c:/dryfruitproductwebsite/style.css', css);
fs.writeFileSync('c:/dryfruitproductwebsite/script.js', js);
console.log('Update 2 applied.');
