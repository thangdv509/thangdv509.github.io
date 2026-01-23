import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <CustomCursor />
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
