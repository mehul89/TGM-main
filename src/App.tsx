import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TgmConcierge } from './components/TgmConcierge';
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicePage } from './pages/ServicePage';
import { PartnersPage } from './pages/PartnersPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

export const App: React.FC = () => {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <TgmConcierge />
      <CustomCursor />
    </>
  );
};

export default App;
