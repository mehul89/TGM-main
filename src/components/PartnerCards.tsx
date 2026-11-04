import React from 'react';
import { Link } from 'react-router-dom';
import { PARTNERS } from '../data/partners';

interface PartnerCardsProps {
  showFullLink?: boolean;
}

export const PartnerCards: React.FC<PartnerCardsProps> = ({ showFullLink = true }) => {
  return (
    <div className="grid g2">
      {PARTNERS.map((p) => {
        const displayName = p.id === 'yogesh' ? 'CA Yogesh Trivedi' : p.name;
        return (
          <article key={p.id} className="card partner">
            <div className="portrait">
              <img
                src={p.img}
                alt={p.alt}
                width="800"
                height="1000"
                loading="lazy"
              />
            </div>
            <div className="body">
              <p className="eyebrow" style={{ margin: 0 }}>
                {p.eyebrow}
              </p>
              <h3>{displayName}</h3>
              <p className="role">{p.role}</p>
              <p
                className="partner-intro"
                style={{ margin: 0, fontSize: '15px', lineHeight: '24px', color: 'var(--text-dark)' }}
              >
                {p.partnerIntro}
              </p>
              <p className="langs">
                <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Languages: </span>
                {p.langs}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {showFullLink && (
                  <Link className="arrow-link" to={`/partners#${p.id}`}>
                    <span>Full partner dossier</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </Link>
                )}
                {p.contactUrl && (
                  <a
                    className="arrow-link"
                    href={p.contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--gold-dark)', fontWeight: 600 }}
                  >
                    <span>Contact {displayName}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
