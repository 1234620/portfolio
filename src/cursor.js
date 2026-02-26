/**
 * Custom Cursor Module
 * --------------------
 * Two-layer cursor inspired by tajmirul.site:
 *  • Inner dot  — snaps to mouse position instantly
 *  • Outer ring — follows with smooth spring-like interpolation
 *  • On hover over interactive elements the ring expands and gains an accent glow
 *  • Cursor hides when the mouse leaves the viewport and reappears on re-entry
 *  • Disabled on touch devices via CSS (cursor.css handles display:none)
 */

export function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  // Bail on touch-only devices or missing elements
  if (!dot || !ring || matchMedia('(hover: none)').matches) return;

  /* ── State ─────────────────────────────────────────── */
  let mouse = { x: -100, y: -100 };        // true mouse position
  let ringPos = { x: -100, y: -100 };      // interpolated ring position
  let visible = false;
  let hovering = false;
  let clicking = false;
  const LERP_SPEED = 0.12;                  // lower = more lag, higher = tighter follow

  /* ── Mouse tracking ────────────────────────────────── */
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Instant dot placement (no lag)
    dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;

    if (!visible) {
      visible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  // Hide when cursor leaves the window
  document.addEventListener('mouseleave', () => {
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    visible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  /* ── Click feedback ────────────────────────────────── */
  document.addEventListener('mousedown', () => {
    clicking = true;
    dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(0.6)`;
    ring.style.width = '32px';
    ring.style.height = '32px';
  });

  document.addEventListener('mouseup', () => {
    clicking = false;
    dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(1)`;
    ring.style.width = hovering ? '60px' : '40px';
    ring.style.height = hovering ? '60px' : '40px';
  });

  /* ── Ring animation loop ───────────────────────────── */
  function tick() {
    // Spring-like interpolation toward the mouse
    ringPos.x += (mouse.x - ringPos.x) * LERP_SPEED;
    ringPos.y += (mouse.y - ringPos.y) * LERP_SPEED;

    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;

    requestAnimationFrame(tick);
  }
  tick();

  /* ── Hover detection ───────────────────────────────── */
  // All interactive elements that should trigger the expand effect
  const hoverTargets = [
    'a',
    'button',
    '.projects__item',
    '.stack__item',
    '.hero__cta',
    '.nav__hamburger',
    '.menu-overlay__link',
  ];

  const selector = hoverTargets.join(', ');

  // Event delegation — avoids O(n) listeners, works with dynamically-added elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(selector)) {
      hovering = true;
      dot.classList.add('cursor--hover');
      ring.classList.add('cursor--hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(selector)) {
      hovering = false;
      if (!clicking) {
        dot.classList.remove('cursor--hover');
        ring.classList.remove('cursor--hover');
      }
    }
  });

  /* ── Initial hide until first move ─────────────────── */
  dot.style.opacity = '0';
  ring.style.opacity = '0';
}
