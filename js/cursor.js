const RING_LERP = 0.1;
const RING_SIZE = 36;
const RING_SIZE_HOVER = 52;
const DOT_SIZE = 6;
const ACCENT = '#ff5500';

export function initCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  document.body.appendChild(ring);
  document.body.appendChild(dot);

  const style = document.createElement('style');
  style.textContent = `
    .cursor-ring {
      position: fixed;
      left: 0;
      top: 0;
      width: ${RING_SIZE}px;
      height: ${RING_SIZE}px;
      margin-left: ${-RING_SIZE / 2}px;
      margin-top: ${-RING_SIZE / 2}px;
      border: 1.5px solid ${ACCENT};
      border-radius: 50%;
      box-sizing: border-box;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.7;
      will-change: transform, width, height, margin;
      transition:
        width 0.35s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1)),
        height 0.35s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1)),
        margin 0.35s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
    }
    .cursor-ring.is-hover {
      width: ${RING_SIZE_HOVER}px;
      height: ${RING_SIZE_HOVER}px;
      margin-left: ${-RING_SIZE_HOVER / 2}px;
      margin-top: ${-RING_SIZE_HOVER / 2}px;
    }
    .cursor-dot {
      position: fixed;
      left: 0;
      top: 0;
      width: ${DOT_SIZE}px;
      height: ${DOT_SIZE}px;
      margin-left: ${-DOT_SIZE / 2}px;
      margin-top: ${-DOT_SIZE / 2}px;
      border-radius: 50%;
      background: ${ACCENT};
      pointer-events: none;
      z-index: 9999;
      will-change: transform;
    }
    body.is-cursor-custom { cursor: none !important; }
    body.is-cursor-custom a,
    body.is-cursor-custom button,
    body.is-cursor-custom [role="button"],
    body.is-cursor-custom input[type="submit"],
    body.is-cursor-custom input[type="button"],
    body.is-cursor-custom .btn,
    body.is-cursor-custom label[for] { cursor: none !important; }
  `;
  document.head.appendChild(style);

  document.body.classList.add('is-cursor-custom');

  let targetX = 0;
  let targetY = 0;
  let ringX = 0;
  let ringY = 0;
  let raf = 0;

  const interactiveSelector =
    'a, button, [role="button"], input[type="submit"], input[type="button"], .btn, label[for], summary';

  function updateHover(clientX, clientY) {
    const el = document.elementFromPoint(clientX, clientY);
    const over = el && el.closest(interactiveSelector);
    ring.classList.toggle('is-hover', Boolean(over));
  }

  function onMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    updateHover(targetX, targetY);
  }

  function tick() {
    ringX += (targetX - ringX) * RING_LERP;
    ringY += (targetY - ringY) * RING_LERP;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    raf = requestAnimationFrame(tick);
  }

  ring.style.transform = 'translate3d(0, 0, 0)';
  dot.style.transform = 'translate3d(0, 0, 0)';

  window.addEventListener('pointermove', onMove, { passive: true });
  raf = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener('pointermove', onMove);
    cancelAnimationFrame(raf);
    ring.remove();
    dot.remove();
    style.remove();
    document.body.classList.remove('is-cursor-custom');
  };
}
