/**
 * Animations Module — GSAP + ScrollTrigger
 * ------------------------------------------
 * Premium scroll-driven animations matching the tajmirul.site feel:
 *
 *  HERO
 *   • Title lines slide up from below with heavy easing (power4.out)
 *   • Bio text fades up after title settles
 *   • CTA button fades up with a subtle elastic bounce
 *   • Stats counter numbers animate from 0 → target with an odometer feel
 *   • Stats fade in from the right with stagger
 *
 *  ABOUT
 *   • Large quote — word-by-word stagger reveal on scroll
 *   • Divider line grows from left to right
 *   • "Hi, I'm Ahmed" heading slides up
 *   • Description paragraphs stagger up
 *
 *  TECH STACK
 *   • Section title slides up on scroll
 *   • Grid items stagger-fade with a cascading wave
 *
 *  EXPERIENCE
 *   • Section title slides up
 *   • Each row slides in from the left with stagger
 *
 *  PROJECTS
 *   • Section title slides up
 *   • Each project row rises up with stagger, earns `.revealed` class
 *     so the CSS dim-on-hover effect takes over properly
 *
 *  CONTACT
 *   • Subtitle fades up
 *   • Email scales in with a focal zoom
 *
 * All triggers use `start: 'top 85%'` (element's top enters 85% viewport)
 * to fire slightly early — feels snappy but not premature.
 *
 * `once: true` on all ScrollTriggers so animations play once and don't
 * replay on scroll-back — keeps it classy.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared easing curves
const EASE_SMOOTH = 'power3.out';
const EASE_HEAVY = 'power4.out';
const EASE_ELASTIC = 'back.out(1.4)';

export function initAnimations() {
  heroAnimations();
  aboutAnimations();
  stackAnimations();
  experienceAnimations();
  projectAnimations();
  contactAnimations();
}


/* ═══════════════════════════════════════════════════════
   HERO — on page load (no ScrollTrigger)
   ═══════════════════════════════════════════════════════ */

function heroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: EASE_HEAVY } });

  // 1. Title lines — dramatic slide-up reveal
  const titleLines = document.querySelectorAll('.hero__title-line');
  tl.to(titleLines, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.18,
  }, 0.3);

  // 2. Bio paragraph — fade up after title
  tl.to('.hero__bio', {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: EASE_SMOOTH,
  }, 0.9);

  // 3. CTA button — pop in with subtle overshoot
  tl.to('.hero__cta', {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: EASE_ELASTIC,
  }, 1.1);

  // 4. Stats — slide in from right with stagger
  const stats = document.querySelectorAll('.hero__stat');
  tl.to(stats, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: EASE_SMOOTH,
  }, 1.0);

  // 5. Animated number counters (odometer effect)
  const counters = document.querySelectorAll('.hero__stat-number[data-count]');
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count, 10);
    const obj = { val: 0 };

    tl.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate() {
        counter.textContent = Math.round(obj.val);
      },
    }, 1.2);
  });
}


/* ═══════════════════════════════════════════════════════
   ABOUT — scroll-triggered
   ═══════════════════════════════════════════════════════ */

function aboutAnimations() {
  // Quote — dramatic word-by-word stagger reveal
  const quoteParagraph = document.querySelector('.about__quote p');
  if (quoteParagraph) {
    // Split text into individual word spans for staggered animation
    const text = quoteParagraph.textContent.trim();
    const words = text.split(/\s+/);
    quoteParagraph.innerHTML = words
      .map((w) => `<span class="word" style="display:inline-block;opacity:0;transform:translateY(18px)">${w}&nbsp;</span>`)
      .join('');

    const wordSpans = quoteParagraph.querySelectorAll('.word');

    gsap.to(wordSpans, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.035,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.about__quote',
        start: 'top 82%',
        once: true,
      },
    });

    // Also reveal the container that starts opacity:0
    gsap.to(quoteParagraph, {
      opacity: 1,
      y: 0,
      duration: 0.01,  // instant — the words handle the pretty part
      scrollTrigger: {
        trigger: '.about__quote',
        start: 'top 82%',
        once: true,
      },
    });
  }

  // Divider line — grow from left
  const dividerLine = document.querySelector('.about__divider-line');
  if (dividerLine) {
    gsap.fromTo(dividerLine,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.2,
        ease: EASE_SMOOTH,
        scrollTrigger: {
          trigger: '.about__divider',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  // "Hi, I'm Ahmed" heading
  const aboutHeading = document.querySelector('.about__heading h2');
  if (aboutHeading) {
    gsap.to(aboutHeading, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.about__content',
        start: 'top 85%',
        once: true,
      },
    });
  }

  // Description paragraphs — stagger
  const descParagraphs = document.querySelectorAll('.about__description p');
  if (descParagraphs.length) {
    gsap.to(descParagraphs, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.about__description',
        start: 'top 85%',
        once: true,
      },
    });
  }
}


/* ═══════════════════════════════════════════════════════
   TECH STACK — scroll-triggered
   ═══════════════════════════════════════════════════════ */

function stackAnimations() {
  // Section title
  const stackTitle = document.querySelector('.stack__title');
  if (stackTitle) {
    gsap.to(stackTitle, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: stackTitle,
        start: 'top 88%',
        once: true,
      },
    });
  }

  // Grid items — cascading wave stagger
  const stackItems = document.querySelectorAll('.stack__item:not(.stack__item--hidden)');
  if (stackItems.length) {
    gsap.to(stackItems, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: {
        each: 0.07,
        from: 'start',
      },
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.stack__grid',
        start: 'top 85%',
        once: true,
      },
    });
  }
}


/* ═══════════════════════════════════════════════════════
   EXPERIENCE — scroll-triggered
   ═══════════════════════════════════════════════════════ */

function experienceAnimations() {
  // Section title
  const expTitle = document.querySelector('.experience__title');
  if (expTitle) {
    gsap.to(expTitle, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: expTitle,
        start: 'top 88%',
        once: true,
      },
    });
  }

  // Each experience row — slide from left with stagger
  const expItems = document.querySelectorAll('.experience__item');
  expItems.forEach((item, i) => {
    gsap.to(item, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay: i * 0.12,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        once: true,
      },
    });
  });
}


/* ═══════════════════════════════════════════════════════
   PROJECTS — scroll-triggered
   ═══════════════════════════════════════════════════════ */

function projectAnimations() {
  // Section title
  const projTitle = document.querySelector('.projects__title');
  if (projTitle) {
    gsap.to(projTitle, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: projTitle,
        start: 'top 88%',
        once: true,
      },
    });
  }

  // Each project row — rise up + earn `.revealed` class for CSS hover effect
  const projectItems = document.querySelectorAll('.projects__item');
  projectItems.forEach((item, i) => {
    gsap.to(item, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay: i * 0.1,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        once: true,
      },
      onComplete() {
        // Hand control to CSS for the hover-dim interaction
        item.classList.add('revealed');
      },
    });
  });
}


/* ═══════════════════════════════════════════════════════
   CONTACT — scroll-triggered
   ═══════════════════════════════════════════════════════ */

function contactAnimations() {
  // Subtitle — fade up
  const subtitle = document.querySelector('.contact__subtitle');
  if (subtitle) {
    gsap.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: subtitle,
        start: 'top 88%',
        once: true,
      },
    });
  }

  // Email — scale-in zoom effect
  const email = document.querySelector('.contact__email');
  if (email) {
    gsap.to(email, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: EASE_ELASTIC,
      scrollTrigger: {
        trigger: email,
        start: 'top 90%',
        once: true,
      },
    });
  }
}
