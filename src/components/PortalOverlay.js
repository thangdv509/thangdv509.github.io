import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLOSE_MS, HOLD_MS, TOTAL_MS } from './portalTransitionTiming';
import './PortalOverlay.css';

// A cosmic "black hole" wipe: a dark vortex grows from the clicked object
// until it swallows the whole viewport (hiding the route swap underneath),
// then shrinks back down through that same point — so the new page reads as
// emerging from inside the vortex, outward, rather than just fading in.
export default function PortalOverlay({ active, origin, transitionKey }) {
  const maxRadius = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const cx = origin?.x ?? window.innerWidth / 2;
    const cy = origin?.y ?? window.innerHeight / 2;
    const dx = Math.max(cx, window.innerWidth - cx);
    const dy = Math.max(cy, window.innerHeight - cy);
    return Math.hypot(dx, dy) + 40;
  }, [origin]);

  const cx = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const cy = origin?.y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const closed = `circle(${maxRadius}px at ${cx}px ${cy}px)`;
  const open = `circle(0px at ${cx}px ${cy}px)`;
  const t1 = CLOSE_MS / TOTAL_MS;
  const t2 = (CLOSE_MS + HOLD_MS) / TOTAL_MS;

  return (
    <AnimatePresence>
      {active && (
        <motion.div key={transitionKey} className="portal-overlay" aria-hidden="true">
          <motion.div
            className="portal-clip"
            initial={{ clipPath: open }}
            animate={{ clipPath: [open, closed, closed, open] }}
            transition={{ duration: TOTAL_MS / 1000, times: [0, t1, t2, 1], ease: ['easeIn', 'linear', 'easeOut'] }}
          >
            <motion.div
              className="portal-swirl"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
            />
            <div className="portal-core" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
