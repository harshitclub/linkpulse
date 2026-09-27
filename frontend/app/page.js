'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CreateLinkForm from '../components/CreateLinkForm';
import LinkCard from '../components/LinkCard';
import AnalyticsModal from '../components/AnalyticsModal';
import { api } from '../services/api';

/**
 * Main Dashboard Page
 * Connects all components: Navbar, Stats, CreateLinkForm, LinkList, Analytics, and Toasts.
 */
export default function Dashboard() {
  // State variables
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAnalyticsId, setActiveAnalyticsId] = useState(null);
  const [toastText, setToastText] = useState(null);

  // Helper to show temporary toast message
  const showToast = (message) => {
    setToastText(message);
    setTimeout(() => setToastText(null), 3000);
  };

  // Load all links from backend on page load
  const loadLinks = async () => {
    try {
      setLoading(true);
      const data = await api.getLinks();
      setLinks(data || []);
    } catch (error) {
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  // Add newly created link to state
  const handleLinkCreated = (newLink) => {
    setLinks((prevLinks) => [
      {
        ...newLink,
        totalClicks: 0,
      },
      ...prevLinks,
    ]);
  };

  // Remove deleted link from state
  const handleLinkDeleted = (deletedId) => {
    setLinks((prevLinks) => prevLinks.filter((l) => l.id !== deletedId));
  };

  // Calculate total clicks across all links
  const totalClicksCount = links.reduce((sum, item) => sum + (item.totalClicks || 0), 0);

  // Filter links by search query (title, shortCode, or URL)
  const filteredLinks = links.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.shortCode?.toLowerCase().includes(q) ||
      item.originalUrl?.toLowerCase().includes(q) ||
      item.title?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="container">
        {/* Hero Title Section */}
        <section className="hero">
          <h1>URL Management & Analytics</h1>
          <p>Create clean short links with instant redirects and real-time visitor stats.</p>
        </section>

        {/* Overview Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Links</div>
            <div className="stat-number">{links.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Clicks</div>
            <div className="stat-number">{totalClicksCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Clicks / Link</div>
            <div className="stat-number">
              {links.length > 0 ? (totalClicksCount / links.length).toFixed(1) : '0.0'}
            </div>
          </div>
        </div>

        {/* Create Link Form */}
        <CreateLinkForm onLinkCreated={handleLinkCreated} showToast={showToast} />

        {/* Links List Header & Search Bar */}
        <div className="list-header">
          <h2 style={{ fontSize: '14px', fontWeight: 600 }}>Your Short Links</h2>
          <input
            type="text"
            className="input search-box"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Links List Container */}
        {loading ? (
          <div className="empty-message">Loading links...</div>
        ) : filteredLinks.length === 0 ? (
          <div className="empty-message">
            <p>No links found. Create your first short link above!</p>
          </div>
        ) : (
          <div className="links-container">
            {filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onLinkDeleted={handleLinkDeleted}
                onOpenAnalytics={(id) => setActiveAnalyticsId(id)}
                showToast={showToast}
              />
            ))}
          </div>
        )}
      </main>

      {/* Analytics Modal Popup */}
      {activeAnalyticsId && (
        <AnalyticsModal
          linkId={activeAnalyticsId}
          onClose={() => setActiveAnalyticsId(null)}
        />
      )}

      {/* Floating Toast Notification */}
      {toastText && <div className="toast-box">{toastText}</div>}
    </div>
  );
}
