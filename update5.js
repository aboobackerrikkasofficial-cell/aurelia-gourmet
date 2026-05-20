const fs = require('fs');
let css = fs.readFileSync('c:/dryfruitproductwebsite/style.css', 'utf8');

if (!css.includes('.pulse')) {
  css += `
/* Pulse Animation for Badges */
@keyframes badgePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); background-color: var(--accent-gold-bright); }
  100% { transform: scale(1); }
}
.pulse {
  animation: badgePulse 0.3s ease-out;
}

/* Better star interactions */
.interactive-star {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease, text-shadow 0.2s ease;
}

/* Fix missing icons issue */
svg {
  display: inline-block;
  vertical-align: middle;
}
`;
  fs.writeFileSync('c:/dryfruitproductwebsite/style.css', css);
  console.log('CSS updated');
} else {
  console.log('CSS already updated');
}
