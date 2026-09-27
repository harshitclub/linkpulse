/**
 * API Service Helper
 * Functions to send HTTP requests to our Node.js/Express backend.
 */

// Base URL of the backend API (defaults to http://localhost:5000)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  // 1. Check if backend server is online
  async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/health`, { cache: 'no-store' });
      return response.ok;
    } catch {
      return false; // Server is unreachable
    }
  },

  // 2. Fetch all shortened links
  async getLinks() {
    const response = await fetch(`${API_URL}/api/links`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load links from server.');
    }
    return response.json();
  },

  // 3. Create a new short link
  async createLink({ url, customCode, title }) {
    const response = await fetch(`${API_URL}/api/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, customCode, title }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create link.');
    }

    return data;
  },

  // 4. Fetch analytics for a specific link
  async getAnalytics(linkId) {
    const response = await fetch(`${API_URL}/api/links/${linkId}/analytics`, {
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to load analytics.');
    }

    return data;
  },

  // 5. Delete a link
  async deleteLink(linkId) {
    const response = await fetch(`${API_URL}/api/links/${linkId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete link.');
    }

    return data;
  },

  // Helper to get the full redirect URL (e.g. http://localhost:5000/sale)
  getShortUrl(shortCode) {
    return `${API_URL}/${shortCode}`;
  },
};
