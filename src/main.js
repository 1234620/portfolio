/**
 * Main Entry Point
 * -----------------
 * Imports all CSS stylesheets (Vite handles bundling)
 * and initializes every module after the DOM is ready.
 *
 * Load order matters:
 *  1. Cursor   — needs to register mousemove before any interactions
 *  2. Particles — async, doesn't block anything
 *  3. Menu     — drawer + filter tabs + scroll bar
 *  4. Animations — GSAP (runs hero immediately, registers ScrollTriggers)
 */

/* ── Styles ──────────────────────────────────────────── */
import './styles/globals.css';
import './styles/cursor.css';
import './styles/menu.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/stack.css';
import './styles/experience.css';
import './styles/projects.css';
import './styles/contact.css';
import './styles/cat.css';

/* ── Modules ─────────────────────────────────────────── */
import { initCursor } from './cursor.js';
import { initParticles } from './particles.js';
import { initMenu, initStackFilter, initScrollProgress } from './menu.js';
import { initAnimations } from './animations.js';
import { initCat } from './cat.js';

/* ── Bootstrap ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor (must go first to catch initial mouse position)
  initCursor();

  // Particle star-field (async — fires and forgets)
  initParticles();

  // Navigation drawer, stack filter tabs, scroll progress bar
  initMenu();
  initStackFilter();
  initScrollProgress();

  // GSAP animations — hero plays immediately, others on scroll
  initAnimations();

  // Peeking cat with cursor-tracking eyes
  initCat();
});
