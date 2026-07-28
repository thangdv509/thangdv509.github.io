import React, { Suspense, createContext, lazy, useCallback, useContext, useRef, useState } from 'react';
import { CLOSE_MS, TOTAL_MS } from '../components/portalTransitionTiming';

// Lazy so framer-motion only downloads for visitors who actually trigger a
// desk-object transition from Home — Publications/Achievements/etc. never
// pay for it on their own initial load.
const PortalOverlay = lazy(() => import('../components/PortalOverlay'));

const PortalTransitionContext = createContext();

export const usePortalTransition = () => {
  const context = useContext(PortalTransitionContext);
  if (!context) {
    throw new Error('usePortalTransition must be used within a PortalTransitionProvider');
  }
  return context;
};

// Lives at the Layout level (outside <Outlet/>) so the vortex survives the
// route swap underneath it — the overlay never unmounts mid-transition,
// only the page content behind it does.
export const PortalTransitionProvider = ({ children }) => {
  const [state, setState] = useState({ active: false, origin: null, key: 0 });
  const timers = useRef([]);

  const runTransition = useCallback((origin, onCovered) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState((s) => ({ active: true, origin, key: s.key + 1 }));
    timers.current.push(setTimeout(onCovered, CLOSE_MS));
    timers.current.push(setTimeout(() => {
      setState((s) => ({ ...s, active: false }));
    }, TOTAL_MS));
  }, []);

  return (
    <PortalTransitionContext.Provider value={{ runTransition }}>
      {children}
      {state.active && (
        <Suspense fallback={null}>
          <PortalOverlay active={state.active} origin={state.origin} transitionKey={state.key} />
        </Suspense>
      )}
    </PortalTransitionContext.Provider>
  );
};
