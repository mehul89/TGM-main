import React from 'react';
import { Link } from 'react-router-dom';

interface LegalPageLayoutProps {
  title: string;
  intro: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, intro, children }) => (
  <main id="main" className="legal-page">
    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs">
          <Link to="/">Home</Link> / {title}
        </p>
        <p className="eyebrow on-dark">Legal Information</p>
        <h1 className="h1">{title}</h1>
        <p className="lead">{intro}</p>
        <p className="legal-updated">Last updated: 13 November 2026</p>
      </div>
    </section>

    <section className="sec sec-cream legal-content">
      <div className="wrap">
        <div className="legal-document">{children}</div>
      </div>
    </section>
  </main>
);
