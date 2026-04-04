/* Query string — иначе CDN/браузер держат старый cursor.js при обновлённом main.js */
import { initCursor } from './cursor.js?v=7';
import { initParallax } from './parallax.js?v=7';
import { initScrollAnimations } from './scroll-animations.js?v=7';

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
