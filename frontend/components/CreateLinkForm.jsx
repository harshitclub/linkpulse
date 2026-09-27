'use client';

import { useState } from 'react';
import { api } from '../services/api';

/**
 * CreateLinkForm Component
 * Form to input destination URL, optional title, and optional custom alias.
 */
export default function CreateLinkForm({ onLinkCreated, showToast }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Simple validation
    if (!url.trim()) {
      setErrorMessage('Please enter a destination URL.');
      return;
    }

    setLoading(true);

    try {
      // Call backend API to create link
      const newLink = await api.createLink({
        url: url.trim(),
        title: title.trim() || undefined,
        customCode: customCode.trim() || undefined,
      });

      // Clear input fields
      setUrl('');
      setTitle('');
      setCustomCode('');

      // Update parent list and show toast
      onLinkCreated(newLink);
      showToast('Short link created successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-heading">Create Short Link</h2>

      <form onSubmit={handleSubmit}>
        {/* Destination URL Input */}
        <div className="form-group">
          <label className="form-label">Destination URL *</label>
          <input
            type="url"
            className="input"
            placeholder="https://example.com/long-page-link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        {/* Optional Title and Custom Alias */}
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Title (Optional)</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. My Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Custom Alias (Optional)</label>
            <div className="input-with-prefix">
              <span className="input-prefix">/</span>
              <input
                type="text"
                className="input"
                placeholder="my-link"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p style={{ color: 'var(--danger-color)', fontSize: '12px', marginBottom: '10px' }}>
            ⚠️ {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Shorten URL'}
        </button>
      </form>
    </div>
  );
}
