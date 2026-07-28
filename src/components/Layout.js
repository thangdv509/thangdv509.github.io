import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import { PortalTransitionProvider } from '../context/PortalTransitionContext';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <CustomCursor />
      <Navigation />
      <PortalTransitionProvider>
        <main className="main-content">
          <Outlet />
        </main>
      </PortalTransitionProvider>
    </div>
  );
}

export default Layout;
