import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page not found | TGM Accounting & Auditing';
  }, []);

  return (
    <main id="main">
      <section className="sec sec-cream" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <p className="eyebrow">404 Error</p>
          <h1 className="h2" style={{ marginBottom: '16px' }}>
            This page could not be located.
          </h1>
          <p className="lead" style={{ margin: '0 auto 32px' }}>
            The requested resource or jurisdiction page does not exist. Please return to the homepage or reach out to our team directly.
          </p>
          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-forest" to="/">
              Return to Homepage
            </Link>
            <Link className="btn btn-line-forest" to="/contact">
              Contact Advisory Desk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
