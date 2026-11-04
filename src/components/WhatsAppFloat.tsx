import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      className="wa-float"
      href={SITE_CONFIG.wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct consultation on WhatsApp"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
};
