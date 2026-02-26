/**
 * Particles Background Module
 * ----------------------------
 * Atmospheric star-field behind all content, matching tajmirul.site's
 * subtle floating dots. Uses tsParticles with the slim bundle to keep
 * the page lightweight.
 *
 * Key choices:
 *  • No links between particles — keeps it clean and minimal
 *  • Very slow drift speed for a calm, ambient feel
 *  • Particles gently pulse opacity for a "breathing" effect
 *  • Responsive density — fewer particles on mobile to save GPU
 *  • Slight mouse repulse so particles feel alive without being distracting
 */

export async function initParticles() {
  try {
    // Dynamic imports to avoid blocking page render
    const { tsParticles } = await import('tsparticles');
    const { loadSlim } = await import('@tsparticles/slim');

    await loadSlim(tsParticles);

    await tsParticles.load({
      id: 'particles-bg',
      options: {
        fullScreen: false,           // we position via CSS (#particles-bg is fixed)

        background: {
          color: 'transparent',
        },

        fpsLimit: 60,
        detectRetina: true,

        particles: {
          number: {
            value: 90,
            density: {
              enable: true,
              area: 1000,
            },
          },

          color: {
            value: '#ffffff',
          },

          shape: {
            type: 'circle',
          },

          opacity: {
            value: { min: 0.05, max: 0.35 },
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: 0.03,
              sync: false,
            },
          },

          size: {
            value: { min: 0.6, max: 2.2 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false,
            },
          },

          move: {
            enable: true,
            speed: 0.3,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
            // Tiny random wobble for organic feel
            attract: {
              enable: false,
            },
          },

          links: {
            enable: false,            // no connecting lines — matches tajmirul style
          },
        },

        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: 'grab',           // subtle pull toward cursor
            },
            onClick: {
              enable: false,
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.08,
                color: '#6366f1',      // accent-colored grab lines
              },
            },
          },
        },

        // Responsive overrides — fewer particles on smaller screens
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: 40 },
                move: { speed: 0.2 },
              },
              interactivity: {
                events: {
                  onHover: { enable: false },  // no hover on touch devices
                },
              },
            },
          },
        ],
      },
    });
  } catch (err) {
    // Particles are non-critical — log and carry on
    console.warn('[particles] Failed to initialize:', err);
  }
}
