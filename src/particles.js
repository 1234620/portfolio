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
    const { tsParticles } = await import('@tsparticles/engine');
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
            speed: { min: 0.2, max: 0.7 },
            direction: 'bottom',
            random: false,
            straight: true,
            outModes: {
              default: 'out',
              bottom: 'out',
              top: 'out',
              left: 'out',
              right: 'out',
            },
            drift: 0,
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

          wobble: {
            enable: false,
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
                move: { speed: { min: 0.1, max: 0.4 } },
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
