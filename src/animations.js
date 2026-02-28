/**
 * Animations Module — GSAP + ScrollTrigger
 * ------------------------------------------
 * Snappy scroll-driven animations.
 *
 * KEY CHANGES from v1:
 *  • toggleActions: 'play none none none' — once revealed, stays shown
 *    (no more janky reverse on scroll-back)
 *  • Triggers fire at 'top 92%' — almost immediately when element enters viewport
 *  • Shorter durations (0.4-0.6s) for snappy feedback
 *  • Reduced stagger values for tighter choreography
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared easing curves
const EASE_SMOOTH = 'power3.out';
const EASE_HEAVY = 'power4.out';
const EASE_ELASTIC = 'back.out(1.4)';

// Shared ScrollTrigger config — fires early, plays once
const SCROLL_DEFAULTS = {
  start: 'top 92%',
  toggleActions: 'play none none none',
};

export function initAnimations() {
  heroAnimations();
  aboutAnimations();
  stackAnimations();
  experienceAnimations();
  projectAnimations();
  contactAnimations();
}


/* ═══════════════════════════════════════════════════════
   HERO — on page load
   ═══════════════════════════════════════════════════════ */

function heroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: EASE_HEAVY } });

  const titleLines = document.querySelectorAll('.hero__title-line');
  tl.to(titleLines, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.12,
  }, 0.2);

  tl.to('.hero__bio', {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: EASE_SMOOTH,
  }, 0.6);

  tl.to('.hero__cta', {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: EASE_ELASTIC,
  }, 0.8);

  const stats = document.querySelectorAll('.hero__stat');
  tl.to(stats, {
    x: 0,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: EASE_SMOOTH,
  }, 0.7);

  // Animated number counters
  const counters = document.querySelectorAll('.hero__stat-number[data-count]');
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count, 10);
    const obj = { val: 0 };
    tl.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate() {
        counter.textContent = Math.round(obj.val);
      },
    }, 0.9);
  });
}


/* ═══════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════ */

function aboutAnimations() {
  // Quote — word-by-word stagger
  const quoteParagraph = document.querySelector('.about__quote p');
  if (quoteParagraph) {
    const text = quoteParagraph.textContent.trim();
    const words = text.split(/\s+/);
    quoteParagraph.innerHTML = words
      .map((w) => `<span class="word" style="display:inline-block;opacity:0;transform:translateY(14px)">${w}&nbsp;</span>`)
      .join('');

    const wordSpans = quoteParagraph.querySelectorAll('.word');

    const quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about__quote',
        ...SCROLL_DEFAULTS,
      },
    });

    quoteTl.set(quoteParagraph, { opacity: 1, y: 0 });
    quoteTl.to(wordSpans, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.02,
      ease: EASE_SMOOTH,
    });
  }

  // Divider line — grow from left
  const dividerLine = document.querySelector('.about__divider-line');
  if (dividerLine) {
    gsap.fromTo(dividerLine,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.8,
        ease: EASE_SMOOTH,
        scrollTrigger: {
          trigger: '.about__divider',
          ...SCROLL_DEFAULTS,
        },
      }
    );
  }

  // Photo reveal
  const photoWrapper = document.querySelector('.about__photo-wrapper');
  if (photoWrapper) {
    gsap.to(photoWrapper, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.about__content',
        ...SCROLL_DEFAULTS,
      },
    });
  }

  // "Hi, I'm Ahmed" heading
  const aboutHeading = document.querySelector('.about__heading h2');
  if (aboutHeading) {
    gsap.to(aboutHeading, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.about__content',
        ...SCROLL_DEFAULTS,
      },
    });
  }

  // Description paragraphs
  const descParagraphs = document.querySelectorAll('.about__description p');
  if (descParagraphs.length) {
    const descTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about__description',
        ...SCROLL_DEFAULTS,
      },
    });
    descTl.to(descParagraphs, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.12,
      ease: EASE_SMOOTH,
    });
  }
}


/* ═══════════════════════════════════════════════════════
   TECH STACK
   ═══════════════════════════════════════════════════════ */

function stackAnimations() {
  const stackTitle = document.querySelector('.stack__title');
  if (stackTitle) {
    gsap.to(stackTitle, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: stackTitle,
        ...SCROLL_DEFAULTS,
      },
    });
  }

  const stackItems = document.querySelectorAll('.stack__item:not(.stack__item--hidden)');
  if (stackItems.length) {
    const stackTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.stack__grid',
        ...SCROLL_DEFAULTS,
      },
    });
    stackTl.to(stackItems, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      stagger: { each: 0.04, from: 'start' },
      ease: EASE_SMOOTH,
    });
  }
}


/* ═══════════════════════════════════════════════════════
   EXPERIENCE
   ═══════════════════════════════════════════════════════ */

function experienceAnimations() {
  const expTitle = document.querySelector('.experience__title');
  if (expTitle) {
    gsap.to(expTitle, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: expTitle,
        ...SCROLL_DEFAULTS,
      },
    });
  }

  // Batch all items in one timeline instead of individual triggers
  const expItems = document.querySelectorAll('.experience__item');
  if (expItems.length) {
    const expTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.experience__list',
        ...SCROLL_DEFAULTS,
      },
    });
    expTl.to(expItems, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: EASE_SMOOTH,
    });
  }
}


/* ═══════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════ */

function projectAnimations() {
  const projTitle = document.querySelector('.projects__title');
  if (projTitle) {
    gsap.to(projTitle, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: projTitle,
        ...SCROLL_DEFAULTS,
      },
    });
  }

  // Batch all project items into one timeline for snappier load
  const projectItems = document.querySelectorAll('.projects__item');
  if (projectItems.length) {
    const projTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.projects__list',
        ...SCROLL_DEFAULTS,
      },
    });
    projTl.to(projectItems, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      stagger: 0.06,
      ease: EASE_SMOOTH,
      onStart() {
        projectItems.forEach((item) => item.classList.add('revealed'));
      },
    });
  }
}


/* ═══════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════ */

function contactAnimations() {
  const subtitle = document.querySelector('.contact__subtitle');
  if (subtitle) {
    gsap.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: subtitle,
        ...SCROLL_DEFAULTS,
      },
    });
  }

  const email = document.querySelector('.contact__email');
  if (email) {
    gsap.to(email, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: EASE_ELASTIC,
      scrollTrigger: {
        trigger: email,
        ...SCROLL_DEFAULTS,
      },
    });
  }
}
