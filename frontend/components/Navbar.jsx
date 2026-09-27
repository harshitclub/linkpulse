'use client';

import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Navbar Component
 * Displays brand logo, backend connection status, and theme toggle button.
 */
export default function Navbar() {
  const [isOnline, setIsOnline] = useState(false);
  const [theme, setTheme] = useState('light'); // Default to light mode

  // Check if backend API is reachable every 10 seconds
  useEffect(() => {
    const checkServer = async () => {
      const active = await api.checkHealth();
      setIsOnline(active);
    };

    checkServer();
    const timer = setInterval(checkServer, 10000);
    return () => clearInterval(timer);
  }, []);

  // Update data-theme attribute on <html> element when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle between light and dark mode
  const handleToggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        {/* Brand Logo & Name */}
        <div className="brand">
          <span className="brand-badge">LP</span>
          <span>LinkPulse</span>
        </div>

        <div className="nav-actions">
          {/* Backend Connection Indicator */}
          <div className="status-pill" title="Backend Server Status">
            <span className={`status-dot ${isOnline ? 'active' : ''}`} />
            <span>{isOnline ? 'API Connected' : 'API Offline'}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={handleToggleTheme}
            className="btn-icon"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}
