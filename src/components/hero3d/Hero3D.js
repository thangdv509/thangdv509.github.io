import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortalTransition } from '../../context/PortalTransitionContext';
import useReducedMotion from './useReducedMotion';
import { OBJECTS, getObject } from './sectionTargets';
import './Hero3D.css';

const Scene = lazy(() => import('./Scene'));

const BOOT_MESSAGES = ['Booting AI Lab...', 'Welcome', 'Thang Doan', 'LLMs · Trustworthy AI · Safety AI'];

function clearTimers(ref) {
  ref.current.forEach(clearTimeout);
  ref.current = [];
}

export default function Hero3D({ avatarSrc }) {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { runTransition } = usePortalTransition();
  const [focusId, setFocusId] = useState(null);
  const [bootStep, setBootStep] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const timers = useRef([]);
  const after = useCallback((ms, fn) => {
    timers.current.push(setTimeout(fn, reducedMotion ? Math.min(ms, 60) : ms));
  }, [reducedMotion]);

  useEffect(() => () => clearTimers(timers), []);

  const goToAnchor = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const runBootSequence = () => {
    setBootStep(1);
    BOOT_MESSAGES.slice(1).forEach((_, i) => {
      after(650 * (i + 1), () => setBootStep(i + 2));
    });
    after(650 * BOOT_MESSAGES.length + 500, () => {
      goToAnchor('research-interests');
      setFocusId(null);
    });
  };

  const handleActivate = useCallback((id, origin) => {
    const obj = getObject(id);
    if (!obj) return;
    clearTimers(timers);
    setFocusId(id);

    const ZOOM_MS = reducedMotion ? 60 : 700;

    switch (obj.kind) {
      case 'boot':
        if (bootStep === 0) {
          after(ZOOM_MS, runBootSequence);
        } else {
          setFocusId(null);
        }
        break;
      case 'route':
        // Camera dollies into the object first, then the swirl "portal" wipe
        // covers the screen and the route swap happens hidden underneath it.
        after(ZOOM_MS, () => runTransition(origin, () => navigate(obj.to)));
        break;
      case 'anchor':
        after(ZOOM_MS, () => {
          goToAnchor(obj.to);
          after(900, () => setFocusId(null));
        });
        break;
      case 'external':
        after(ZOOM_MS - 200, () => window.open(obj.href, '_blank', 'noopener,noreferrer'));
        after(1100, () => setFocusId(null));
        break;
      case 'terminal':
        after(ZOOM_MS, () => setTerminalOpen(true));
        break;
      case 'mug':
        after(ZOOM_MS, () => {
          setToast('Need more caffeine ☕');
          after(2000, () => setToast(null));
        });
        after(1500, () => setFocusId(null));
        break;
      default:
        setFocusId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootStep, navigate, reducedMotion, after, runTransition]);

  const closeTerminal = () => {
    setTerminalOpen(false);
    setFocusId(null);
  };

  return (
    <div className="hero3d-root">
      <div className="hero3d-canvas-wrap" role="img" aria-label="Interactive 3D desk scene of an AI researcher's workspace — laptop, books, monitor, plant, and a desk lamp">
        {reducedMotion ? (
          <div className="hero3d-static-fallback">
            {avatarSrc && <img src={avatarSrc} alt="Thang Doan" className="hero3d-static-avatar" />}
            <p>Cozy AI lab desk — motion reduced per your system settings.</p>
          </div>
        ) : (
          <Suspense fallback={<div className="hero3d-skeleton" aria-hidden="true" />}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
              camera={{ fov: 44, position: [0, 1.15, 3.35] }}
            >
              <Scene
                onActivate={handleActivate}
                focusId={focusId}
                reducedMotion={reducedMotion}
                screenOn={bootStep > 0}
              />
            </Canvas>
          </Suspense>
        )}

        {bootStep > 0 && (
          <div className="hero3d-boot-caption" aria-live="polite">
            {BOOT_MESSAGES.slice(0, bootStep).map((line, i) => (
              <div key={i} className="hero3d-boot-line">
                {line}
              </div>
            ))}
            <span className="hero3d-cursor-blink">_</span>
          </div>
        )}
      </div>

      <nav className="hero3d-quicklinks" aria-label="Desk shortcuts">
        {OBJECTS.map((obj) => (
          <button
            key={obj.id}
            type="button"
            className={`hero3d-chip${focusId === obj.id ? ' is-active' : ''}`}
            onClick={(e) => handleActivate(obj.id, { x: e.clientX, y: e.clientY })}
            aria-label={obj.hint}
          >
            {obj.label}
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            className="hero3d-terminal-backdrop"
            onClick={closeTerminal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <motion.div
              className="hero3d-terminal"
              role="dialog"
              aria-modal="true"
              aria-label="Projects terminal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
            >
              <div className="hero3d-terminal-titlebar">
                <span>lab@thang-desk:~</span>
                <button type="button" aria-label="Close terminal" onClick={closeTerminal}>×</button>
              </div>
              <div className="hero3d-terminal-body">
                <p>&gt; whoami</p>
                <p>Thang Doan — AI Engineer &amp; Researcher</p>
                <p>&gt; ls research/</p>
                <p>LLMs&nbsp;&nbsp;Trustworthy-AI&nbsp;&nbsp;Safety-AI</p>
                <p>&gt; open activities/</p>
                <button
                  type="button"
                  className="hero3d-terminal-link"
                  onClick={(e) => {
                    const origin = { x: e.clientX, y: e.clientY };
                    closeTerminal();
                    runTransition(origin, () => navigate('/activities'));
                  }}
                >
                  Enter ↵ view activities
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="hero3d-toast"
            role="status"
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
