/**
 * Animations Module — GSAP + ScrollTrigger
 * ------------------------------------------
 * Premium scroll-driven animations matching the tajmirul.site feel.
 *
 * KEY BEHAVIOR:
 *  • Scroll DOWN → animations play forward (elements reveal)
 *  • Scroll UP   → animations play in REVERSE (elements hide back)
 *  • Achieved via `toggleActions: 'play reverse play reverse'`
 *
 *  HERO — plays on page load (no scroll trigger, no reverse)
 *  ALL OTHER SECTIONS — reverse on scroll-back
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared easing curves
const EASE_SMOOTH = 'power3.out';
const EASE_HEAVY = 'power4.out';
const EASE_ELASTIC = 'back.out(1.4)';

// Shared ScrollTrigger config for reversible animations
const SCROLL_DEFAULTS = {
  start: 'top 85%',
  end: 'top 20%',
  toggleActions: 'play reverse play reverse',
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
   HERO — on page load (no reverse — always visible at top)
   ═══════════════════════════════════════════════════════ */

function heroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: EASE_HEAVY } });

  const titleLines = document.querySelectorAll('.hero__title-line');
  tl.to(titleLines, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.18,
  }, 0.3);

  tl.to('.hero__bio', {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: EASE_SMOOTH,
  }, 0.9);

  tl.to('.hero__cta', {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: EASE_ELASTIC,
  }, 1.1);

  const stats = document.querySelectorAll('.hero__stat');
  tl.to(stats, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: EASE_SMOOTH,
  }, 1.0);

  // Animated number counters (odometer effect)
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
   ABOUT — reversible scroll animations
   ═══════════════════════════════════════════════════════ */

function aboutAnimations() {
  // Quote — word-by-word stagger (reversible timeline)
  const quoteParagraph = document.querySelector('.about__quote p');
  if (quoteParagraph) {
    const text = quoteParagraph.textContent.trim();
    const words = text.split(/\s+/);
    quoteParagraph.innerHTML = words
      .map((w) => `<span class="word" style="display:inline-block;opacity:0;transform:translateY(18px)">${w}&nbsp;</span>`)
      .join('');

    const wordSpans = quoteParagraph.querySelectorAll('.word');

    const quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about__quote',
        start: 'top 82%',
        end: 'top 15%',
        toggleActions: 'play reverse play reverse',
      },
    });

    quoteTl.set(quoteParagraph, { opacity: 1, y: 0 });
    quoteTl.to(wordSpans, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.03,
      ease: EASE_SMOOTH,
    });
  }

  // Divider line — grow from left (reversible)
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
          ...SCROLL_DEFAULTS,
        },
      }
    );
  }

  // Photo reveal (reversible)
  const photoWrapper = document.querySelector('.about__photo-wrapper');
  if (photoWrapper) {
    gsap.to(photoWrapper, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.about__content',
        ...SCROLL_DEFAULTS,
      },
    });
  }

  // "Hi, I'm Ahmed" heading (reversible)
  const aboutHeading = document.querySelector('.about__heading h2');
  if (aboutHeading) {
    gsap.to(aboutHeading, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: '.about__content',
        ...SCROLL_DEFAULTS,
      },
    });
  }

  // Description paragraphs (reversible)
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
      duration: 0.8,
      stagger: 0.2,
      ease: EASE_SMOOTH,
    });
  }
}


/* ═══════════════════════════════════════════════════════
   TECH STACK — reversible
   ═══════════════════════════════════════════════════════ */

function stackAnimations() {
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
        end: 'top 20%',
        toggleActions: 'play reverse play reverse',
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
      duration: 0.5,
      stagger: { each: 0.06, from: 'start' },
      ease: EASE_SMOOTH,
    });
  }
}


/* ═══════════════════════════════════════════════════════
   EXPERIENCE — reversible
   ═══════════════════════════════════════════════════════ */

function experienceAnimations() {
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
        end: 'top 20%',
        toggleActions: 'play reverse play reverse',
      },
    });
  }

  const expItems = document.querySelectorAll('.experience__item');
  expItems.forEach((item, i) => {
    gsap.to(item, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay: i * 0.1,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        end: 'top 20%',
        toggleActions: 'play reverse play reverse',
      },
    });
  });
}


/* ═══════════════════════════════════════════════════════
   PROJECTS — reversible (manages .revealed class)
   ═══════════════════════════════════════════════════════ */

function projectAnimations() {
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
        end: 'top 20%',
        toggleActions: 'play reverse play reverse',
      },
    });
  }

  const projectItems = document.querySelectorAll('.projects__item');
  projectItems.forEach((item, i) => {
    gsap.to(item, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay: i * 0.08,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        end: 'top 15%',
        toggleActions: 'play reverse play reverse',
        onEnter: () => item.classList.add('revealed'),
        onLeaveBack: () => item.classList.remove('revealed'),
        onEnterBack: () => item.classList.add('revealed'),
      },
    });
  });
}


/* ═══════════════════════════════════════════════════════
   CONTACT — reversible
   ═══════════════════════════════════════════════════════ */

function contactAnimations() {
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
        end: 'top 20%',
        toggleActions: 'play reverse play reverse',
      },
    });
  }

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
        end: 'top 20%',
        toggleActions: 'play reverse play reverse',
      },
    });
  }
}
