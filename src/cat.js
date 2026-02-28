/**
 * Cat Eye-Tracking Module
 * -----------------------
 * Makes the peeking cat's pupils follow the user's cursor.
 * Adds an idle drift animation when the mouse hasn't moved for a while.
 */

const MAX_PUPIL_OFFSET = 5; // px — how far the pupil can move from center
const IDLE_TIMEOUT = 2500;  // ms before idle drift kicks in

export function initCat() {
    const widget = document.getElementById('cat-widget');
    const pupilL = document.getElementById('cat-pupil-left');
    const pupilR = document.getElementById('cat-pupil-right');
    const eyeL = document.getElementById('cat-eye-left');
    const eyeR = document.getElementById('cat-eye-right');

    if (!widget || !pupilL || !pupilR || !eyeL || !eyeR) return;

    let idleTimer = null;
    let rafId = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    /* ── Helpers ──────────────────────────────── */

    /**
     * Given the bounding rect center of an eye and the mouse coords,
     * return { x, y } pixel offset for the pupil, clamped to a circle.
     */
    function calcOffset(eyeEl) {
        const rect = eyeEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) * 0.02, MAX_PUPIL_OFFSET);

        return {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
        };
    }

    function updatePupils() {
        const offsetL = calcOffset(eyeL);
        const offsetR = calcOffset(eyeR);

        pupilL.style.transform = `translate(${offsetL.x}px, ${offsetL.y}px)`;
        pupilR.style.transform = `translate(${offsetR.x}px, ${offsetR.y}px)`;
    }

    /* ── Idle Drift ───────────────────────────── */

    let driftAngle = 0;

    function startIdle() {
        widget.classList.add('cat-widget--idle');
        driftLoop();
    }

    function stopIdle() {
        widget.classList.remove('cat-widget--idle');
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    function driftLoop() {
        driftAngle += 0.015;
        const driftX = Math.sin(driftAngle) * 2.5;
        const driftY = Math.cos(driftAngle * 0.7) * 1.5;

        pupilL.style.transform = `translate(${driftX}px, ${driftY}px)`;
        pupilR.style.transform = `translate(${driftX}px, ${driftY}px)`;

        rafId = requestAnimationFrame(driftLoop);
    }

    function resetIdleTimer() {
        stopIdle();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(startIdle, IDLE_TIMEOUT);
    }

    /* ── Event Listeners ──────────────────────── */

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        updatePupils();
        resetIdleTimer();
    });

    // Initial idle timer
    idleTimer = setTimeout(startIdle, IDLE_TIMEOUT);
}
