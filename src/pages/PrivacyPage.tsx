import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../data/siteConfig';
import { LegalPageLayout } from '../components/LegalPageLayout';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | TGM Accounting & Auditing';
  }, []);

  return (
    <LegalPageLayout
      title="Privacy Policy"
      intro="This policy explains what information may be handled when you visit this website or contact TGM."
    >
      <section className="legal-section" aria-labelledby="privacy-controller">
        <h2 id="privacy-controller">Who we are</h2>
        <p>
          TGM Accounting &amp; Auditing LLC is the organization responsible for personal information
          described in this policy. Our Dubai office is at {SITE_CONFIG.address}. For privacy questions,
          contact <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="privacy-information">
        <h2 id="privacy-information">Information you provide</h2>
        <p>
          If you contact us by email, phone, or WhatsApp, we receive the details you choose to share so
          that we can respond. This may include your name and contact details, business or industry
          information, countries of operation, and the subject of your inquiry.
        </p>
        <p>
          The consultation briefing form asks for your name or organization, industry and countries,
          approximate turnover or number of entities, accounting software, and the reason for contacting
          us. The form assembles these values in your browser and opens a prefilled WhatsApp message; it
          does not submit the values to a TGM website server. Sending the message is your choice. WhatsApp
          then processes it under its own terms and privacy practices.
        </p>
        <p>
          The TGM Concierge displays predefined questions and answers in your browser. The widget does not
          ask you to enter free-text personal information. If you follow its WhatsApp link, WhatsApp
          handles that interaction.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="privacy-technical">
        <h2 id="privacy-technical">Technical information and third parties</h2>
        <p>
          When this website is requested, the hosting environment may process standard technical
          information, such as your IP address, browser and device details, pages requested, and request
          times, to deliver and protect the service. The hosting provider controls its own logs and
          retention practices.
        </p>
        <p>
          The website loads fonts from Google Fonts. Your browser may connect to Google’s font services
          and share technical request information such as your IP address. WhatsApp, email providers, and
          mapping services also operate under their own privacy policies when you choose to use them.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="privacy-use">
        <h2 id="privacy-use">How information is used</h2>
        <p>Information you send to TGM may be used to:</p>
        <ul>
          <li>respond to your questions and consultation requests;</li>
          <li>communicate about services you have asked about or engaged us to provide;</li>
          <li>operate, maintain, and protect our website and communications; and</li>
          <li>meet applicable legal, regulatory, and professional obligations.</li>
        </ul>
      </section>

      <section className="legal-section" aria-labelledby="privacy-sharing">
        <h2 id="privacy-sharing">Sharing and international processing</h2>
        <p>
          TGM does not sell personal information. We may share information with service providers that
          support our communications or website, or with authorities and advisers where required or
          permitted by law. If you choose WhatsApp or another external service, that provider may process
          information in countries outside the UAE under its own terms and safeguards.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="privacy-cookies">
        <h2 id="privacy-cookies">Cookies and similar technologies</h2>
        <p>
          The current website frontend does not implement advertising or analytics cookies. Hosting
          providers and third-party services may use technical storage or similar technologies for their
          own services. You can manage cookies through your browser settings; disabling them may affect
          third-party features.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="privacy-retention">
        <h2 id="privacy-retention">Retention and security</h2>
        <p>
          TGM keeps information it receives only for as long as reasonably needed to respond, maintain a
          business relationship, or meet applicable legal and professional obligations. Hosting and
          third-party providers determine retention for information they process independently.
        </p>
        <p>
          We use reasonable measures to protect information under our control. No website, email, or
          internet transmission can be guaranteed completely secure.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="privacy-rights">
        <h2 id="privacy-rights">Your choices and rights</h2>
        <p>
          Depending on applicable law, you may be entitled to request access to, correction of, or
          deletion of personal information, or to object to or restrict certain processing. To make a
          request, email <a href={`mailto:${SITE_CONFIG.email}?subject=Privacy%20request`}>{SITE_CONFIG.email}</a>.
          You may also choose not to provide information, or contact us through a different channel.
        </p>
      </section>

      <section className="legal-section" aria-labelledby="privacy-updates">
        <h2 id="privacy-updates">Policy updates</h2>
        <p>
          We may update this policy as our website or practices change. The latest version and its update
          date will appear on this page. If you have concerns about how information is handled, please{' '}
          <Link to="/contact">contact TGM</Link>.
        </p>
      </section>
    </LegalPageLayout>
  );
};
