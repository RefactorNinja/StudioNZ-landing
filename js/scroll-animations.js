const STAGGER_MS = 100;

export function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('visible'));
    return;
  }

  const staggerParents = document.querySelectorAll('[data-stagger]');
  staggerParents.forEach((parent) => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * STAGGER_MS}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
