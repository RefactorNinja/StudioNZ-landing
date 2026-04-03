const LERP = 0.12;

export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const logoSrc = new URL('../assets/icons/logo.png', import.meta.url).href;
  const el = document.createElement('div');
  el.className = 'custom-cursor';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<img src="${logoSrc}" alt="" width="56" height="56" />`;
  document.body.appendChild(el);

  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor {
      position: fixed;
      left: 0;
      top: 0;
      width: 56px;
      height: 56px;
      pointer-events: none;
      z-index: 10000;
      opacity: 0.9;
      transform: translate3d(-100px, -100px, 0);
      will-change: transform;
    }
    .custom-cursor img {
      display: block;
      width: 56px;
      height: 56px;
      object-fit: contain;
    }
    body.is-cursor-custom { cursor: none; }
    body.is-cursor-custom a, body.is-cursor-custom button { cursor: none; }
  `;
  document.head.appendChild(style);

  document.body.classList.add('is-cursor-custom');

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let raf = 0;

  function onMove(e) {
    targetX = e.clientX - 28;
    targetY = e.clientY - 28;
  }

  function tick() {
    currentX += (targetX - currentX) * LERP;
    currentY += (targetY - currentY) * LERP;
    el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    raf = requestAnimationFrame(tick);
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  raf = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener('pointermove', onMove);
    cancelAnimationFrame(raf);
    el.remove();
    style.remove();
    document.body.classList.remove('is-cursor-custom');
  };
}
