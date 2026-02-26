/**
 * Particles Background Module — Continuous Snowfall
 * ---------------------------------------------------
 * Atmospheric snowfall effect matching tajmirul.site's background.
 * Particles drift downward continuously, with gentle horizontal wobble
 * and varying sizes/opacities to simulate depth.
 *
 * Key design choices:
 *  • Direction: bottom — particles fall like snow
 *  • Varying size (1–4px) simulates near/far flakes
 *  • Gentle opacity pulse for a shimmering depth effect
 *  • Horizontal wobble via tilt + slight random drift
 *  • No connecting lines — clean and minimal
 *  • Subtle mouse repulse so flakes part around cursor
 *  • Responsive: fewer particles on mobile
 */

export async function initParticles() {
  try {
    const { tsParticles } = await import('tsparticles');
    const { loadSlim } = await import('@tsparticles/slim');

    await loadSlim(tsParticles);

    await tsParticles.load({
      id: 'particles-bg',
      options: {
        fullScreen: false,

        background: {
          color: 'transparent',
        },

        fpsLimit: 60,
        detectRetina: true,

        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              area: 900,
            },
          },

          color: {
            value: '#ffffff',
          },

          shape: {
            type: 'circle',
          },

          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.05,
              sync: false,
            },
          },

          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 0.5,
              sync: false,
            },
          },

          move: {
            enable: true,
            speed: { min: 0.5, max: 1.8 },
            direction: 'bottom',
            random: false,
            straight: false,
            outModes: {
              default: 'out',
              bottom: 'out',
              top: 'out',
              left: 'out',
              right: 'out',
            },
            // Horizontal wobble — makes it feel like real snow
            drift: { min: -0.5, max: 0.5 },
            attract: {
              enable: false,
            },
          },

          // Gentle tilt/rotation for organic snowflake tumble
          rotate: {
            value: { min: 0, max: 360 },
            direction: 'random',
            animation: {
              enable: true,
              speed: 3,
              sync: false,
            },
          },

          // Slight wobble on the path
          wobble: {
            enable: true,
            distance: 8,
            speed: 4,
          },

          links: {
            enable: false,
          },
        },

        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            onClick: {
              enable: false,
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
              speed: 0.5,
            },
          },
        },

        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: 50 },
                move: { speed: { min: 0.3, max: 1 } },
                size: { value: { min: 0.8, max: 2.5 } },
              },
              interactivity: {
                events: {
                  onHover: { enable: false },
                },
              },
            },
          },
        ],
      },
    });
  } catch (err) {
    console.warn('[particles] Failed to initialize:', err);
  }
}
