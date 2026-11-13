import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../data/siteConfig';
import { LegalPageLayout } from '../components/LegalPageLayout';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions | TGM Accounting & Auditing';
  }, []);

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      intro="These terms govern your use of the TGM Accounting & Auditing website and its public information."
    >
      <section className="legal-section" aria-labelledby="terms-acceptance">
        <h2 id="terms-acceptance">Using this website</h2>
        <p>
          By accessing this website, you agree to these terms. If you do not agree, please stop using the
          website. These terms apply to the website and its public content, not to separately agreed
          professional services.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="terms-information">
        <h2 id="terms-information">General information, not professional advice</h2>
        <p>
          Website content is provided for general information only. It is not accounting, audit, tax,
          legal, investment, or other professional advice, and should not be relied on as a substitute for
          advice tailored to your circumstances. Laws and regulatory guidance can change, and information
          may not always be current or complete.
        </p>
        <p>
          Browsing this website, using the TGM Concierge, or contacting us does not by itself create a
          client relationship. Any professional engagement is subject to TGM’s separate confirmation and
          applicable engagement terms.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="terms-contact">
        <h2 id="terms-contact">Contact forms and communications</h2>
        <p>
          The consultation briefing form prepares a message in your browser and opens WhatsApp with that
          message. It does not submit the form fields to a TGM website server. You decide whether to send
          the message; if you do, WhatsApp processes it under its own terms and privacy practices.
        </p>
        <p>
          Please do not send confidential records, credentials, or sensitive personal information through
          a public form or messaging service unless an appropriate channel has been agreed with TGM.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="terms-conduct">
        <h2 id="terms-conduct">Acceptable use</h2>
        <p>You agree not to use the website to:</p>
        <ul>
          <li>violate applicable laws or another person’s rights;</li>
          <li>attempt unauthorized access, disrupt the website, or introduce malicious code; or</li>
          <li>copy, scrape, or republish website content in a way that infringes TGM’s or another party’s rights.</li>
        </ul>
      </section>

      <section className="legal-section" aria-labelledby="terms-rights">
        <h2 id="terms-rights">Website content and third-party services</h2>
        <p>
          Website text, branding, and other materials are owned by TGM Accounting &amp; Auditing LLC or
          used with permission. You may view and print pages for your personal, non-commercial reference.
          Any other reproduction or use requires prior permission unless applicable law allows it.
        </p>
        <p>
          This website may link to third-party services, including WhatsApp, Google Fonts, and mapping
          services. Those services are operated independently and are subject to their own terms and
          privacy policies. TGM does not control their availability or content.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="terms-availability">
        <h2 id="terms-availability">Availability and liability</h2>
        <p>
          The website is provided on an “as available” basis. TGM does not guarantee uninterrupted access
          or that every item of information will be free of errors. To the maximum extent permitted by
          applicable law, TGM is not liable for indirect or consequential loss arising from use of, or
          reliance on, this website. Nothing in these terms limits liability that cannot lawfully be
          limited.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="terms-changes">
        <h2 id="terms-changes">Changes and applicable law</h2>
        <p>
          TGM may update this website or these terms. The updated version will be posted on this page with
          a revised date. These terms are governed by the applicable laws of the United Arab Emirates, and
          disputes are subject to the jurisdiction of the competent courts in Dubai, except where mandatory
          law provides otherwise.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="terms-contact-us">
        <h2 id="terms-contact-us">Contact TGM</h2>
        <p>
          Questions about these terms? Email{' '}
          <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a> or use our{' '}
          <Link to="/contact">contact page</Link>.
        </p>
        <address>{SITE_CONFIG.address}</address>
      </section>
    </LegalPageLayout>
  );
};
