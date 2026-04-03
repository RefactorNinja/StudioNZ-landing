import { initCursor } from './cursor.js';
import { initParallax } from './parallax.js';
import { initScrollAnimations } from './scroll-animations.js';

function boot() {
  initScrollAnimations();
  initParallax();
  initCursor();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
