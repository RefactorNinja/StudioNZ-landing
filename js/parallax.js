export function initParallax() {
  const layer = document.querySelector('.hero__bg');
  if (!layer || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    return;
  }

  const strength = 0.15;

  function onScroll() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * strength;
    layer.style.transform = `translate3d(0, ${offset}px, 0)`;
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => window.removeEventListener('scroll', onScroll);
}
