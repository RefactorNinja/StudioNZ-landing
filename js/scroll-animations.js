const STAGGER_MS = 100;

function revealIfInViewport(el) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return r.top < vh * 0.92 && r.bottom > 0;
}

export function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('visible'));
    return;
  }

  document.documentElement.classList.add('reveal-js');

  document.querySelectorAll('.reveal').forEach((el) => {
    if (revealIfInViewport(el)) el.classList.add('visible');
  });

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

  document.querySelectorAll('.reveal').forEach((el) => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });

  return () => observer.disconnect();
}
