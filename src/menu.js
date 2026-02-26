/**
 * Menu & UI Interactions Module
 * ------------------------------
 * Handles three independent systems:
 *  1. Hamburger / side-drawer navigation (matches tajmirul.site slide-in drawer)
 *  2. Tech Stack category filter tabs
 *  3. Scroll progress indicator bar
 *
 * All class names match the existing HTML markup exactly.
 */

/* ═══════════════════════════════════════════════════════
   1. SIDE DRAWER NAVIGATION
   ═══════════════════════════════════════════════════════ */

export function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('menu-overlay');
  const backdrop = document.getElementById('menu-backdrop');
  const drawer = document.getElementById('menu-drawer');

  if (!toggle || !overlay) return;

  // All clickable nav links inside the drawer
  const navLinks = overlay.querySelectorAll('.menu-overlay__link--nav');

  function openMenu() {
    toggle.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Toggle on hamburger click
  toggle.addEventListener('click', () => {
    overlay.classList.contains('active') ? closeMenu() : openMenu();
  });

  // Close when clicking the dark backdrop (not the drawer itself)
  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close when a menu nav link is clicked (smooth scroll to section)
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      closeMenu();

      // Wait for drawer close animation to finish before scrolling
      setTimeout(() => {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });
}


/* ═══════════════════════════════════════════════════════
   2. TECH STACK FILTER TABS
   ═══════════════════════════════════════════════════════ */

export function initStackFilter() {
  const tabs = document.querySelectorAll('.stack__tab');
  const items = document.querySelectorAll('.stack__item');

  if (!tabs.length || !items.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      // Update active tab
      tabs.forEach((t) => t.classList.remove('stack__tab--active'));
      tab.classList.add('stack__tab--active');

      // Show/hide items with a micro stagger for polish
      let visibleIndex = 0;
      items.forEach((item) => {
        const matches = item.dataset.category === category;

        if (matches) {
          item.classList.remove('stack__item--hidden');

          // Staggered reveal: brief opacity flash to draw attention
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          const delay = visibleIndex * 50; // 50ms stagger per card
          setTimeout(() => {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, delay);
          visibleIndex++;
        } else {
          item.classList.add('stack__item--hidden');
        }
      });
    });
  });
}


/* ═══════════════════════════════════════════════════════
   3. SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════════════ */

export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateProgress();
}
