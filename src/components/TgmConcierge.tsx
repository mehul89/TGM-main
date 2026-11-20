import React, { useState, useEffect, useRef } from 'react';
import { CONCIERGE_QUESTIONS, ConciergeQuestion } from '../data/conciergeFaq';
import { ContactEnquiryForm } from './ContactEnquiryForm';

interface ActiveConversation {
  questionText: string;
  answerText: string;
  isCustom: boolean;
}

const RELATIONSHIP_MANAGER_MESSAGE =
  'For specific questions outside our standard overview topics, please contact our Relationship Manager or advisory agent directly. Kindly complete the consultation form below and our team will respond promptly.';

export const TgmConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<ActiveConversation | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showTypingDots, setShowTypingDots] = useState<boolean>(false);
  const [showFollowUpCta, setShowFollowUpCta] = useState<boolean>(false);
  const [showTemplateForm, setShowTemplateForm] = useState<boolean>(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState<boolean>(true);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth = true) => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [displayedAnswer, showTypingDots, showFollowUpCta, showTemplateForm, activeConversation]);

  const clearTypingTimers = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTypingTimers();
  }, []);

  const startConversationResponse = (conversation: ActiveConversation) => {
    clearTypingTimers();
    setActiveConversation(conversation);
    setDisplayedAnswer('');
    setShowFollowUpCta(false);
    setShowTemplateForm(false);
    setIsTyping(true);
    setShowTypingDots(true);

    typingTimeoutRef.current = setTimeout(() => {
      setShowTypingDots(false);
      const fullText = conversation.answerText;
      let currentIndex = 0;

      typingIntervalRef.current = setInterval(() => {
        currentIndex += 3;
        if (currentIndex >= fullText.length) {
          setDisplayedAnswer(fullText);
          setIsTyping(false);
          setShowFollowUpCta(true);
          if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        } else {
          setDisplayedAnswer(fullText.slice(0, currentIndex));
        }
      }, 16);
    }, 500);
  };

  const handleSelectQuestion = (q: ConciergeQuestion) => {
    startConversationResponse({
      questionText: q.question,
      answerText: q.answer,
      isCustom: false,
    });
  };

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    const matchedTemplate = CONCIERGE_QUESTIONS.find(
      (q) => q.question.toLowerCase() === normalized
    );

    setCustomInput('');

    if (matchedTemplate) {
      handleSelectQuestion(matchedTemplate);
      return;
    }

    startConversationResponse({
      questionText: trimmed,
      answerText: RELATIONSHIP_MANAGER_MESSAGE,
      isCustom: true,
    });
  };

  const handleBackToQuestions = () => {
    clearTypingTimers();
    setActiveConversation(null);
    setDisplayedAnswer('');
    setIsTyping(false);
    setShowTypingDots(false);
    setShowFollowUpCta(false);
    setShowTemplateForm(false);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setHasUnreadNotification(false);
      }
      return !prev;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const getWhatsAppUrl = (questionText: string) => {
    const message = `Hello TGM Team, I visited your website and would like to know more about: ${questionText}`;
    return `https://wa.me/971553310567?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="concierge-root">
      {/* ==================== 1. FLOATING CONCIERGE LAUNCHER (ICON ONLY) ==================== */}
      {!isOpen && (
        <button
          type="button"
          className="concierge-launcher"
          onClick={toggleOpen}
          aria-label="Open TGM Corporate Concierge"
          aria-expanded={isOpen}
          title="TGM Concierge"
        >
          {hasUnreadNotification && (
            <span className="concierge-launcher-badge" aria-label="New update" />
          )}

          <div className="concierge-launcher-icon">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </button>
      )}

      {/* ==================== 2. LUXURY CHAT WINDOW ==================== */}
      {isOpen && (
        <div
          className="concierge-window"
          role="dialog"
          aria-modal="true"
          aria-label="TGM Corporate Concierge"
        >
          {/* Header */}
          <div className="concierge-header">
            <div className="concierge-header-brand">
              <div className="concierge-header-avatar" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="concierge-header-info">
                <div className="concierge-title-row">
                  <h3 className="concierge-title">TGM Concierge</h3>
                  <span className="concierge-status-pill">
                    <span className="concierge-status-dot" />
                    <span>Online</span>
                  </span>
                </div>
                <p className="concierge-subtitle">Your corporate services assistant</p>
              </div>
            </div>

            <div className="concierge-header-actions">
              <button
                type="button"
                className="concierge-header-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize Concierge"
                title="Close Concierge"
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
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="concierge-body" ref={chatBodyRef}>
            {/* VIEW A: WELCOME SCREEN & 10 QUESTION TOPIC CARDS */}
            {!activeConversation && (
              <div className="concierge-welcome-view">
                <div className="concierge-welcome-card">
                  <p className="concierge-welcome-eyebrow">Digital Advisory Desk</p>
                  <h4 className="concierge-welcome-heading">Welcome to TGM.</h4>
                  <p className="concierge-welcome-text">
                    Choose a topic below or type your own question to connect directly with our
                    Relationship Manager.
                  </p>
                  <div className="concierge-gold-rule" />
                </div>

                <div className="concierge-section-title">
                  <span>How can we help you today?</span>
                </div>

                <div className="concierge-questions-grid">
                  {CONCIERGE_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      className="concierge-question-card"
                      onClick={() => handleSelectQuestion(q)}
                    >
                      <div className="concierge-card-num">{q.num}</div>
                      <div className="concierge-card-content">
                        <span className="concierge-card-category">{q.category}</span>
                        <h5 className="concierge-card-question">{q.question}</h5>
                        <p className="concierge-card-desc">{q.shortDesc}</p>
                      </div>
                      <div className="concierge-card-arrow" aria-hidden="true">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="concierge-direct-whatsapp">
                  <span>Need an immediate consultation?</span>
                  <a
                    href="https://wa.me/971553310567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="concierge-direct-link"
                  >
                    <span>Connect directly with an operating partner →</span>
                  </a>
                </div>
              </div>
            )}

            {/* VIEW B: CONVERSATION VIEW */}
            {activeConversation && (
              <div className="concierge-conversation-view">
                {/* User Message (Right Aligned) */}
                <div className="concierge-message user-message">
                  <div className="concierge-bubble user-bubble">
                    <p>{activeConversation.questionText}</p>
                  </div>
                  <span className="concierge-message-time">You</span>
                </div>

                {/* Assistant Message (Left Aligned with TGM Monogram) */}
                <div className="concierge-message assistant-message">
                  <div className="concierge-assistant-avatar" aria-hidden="true">
                    <span>TGM</span>
                  </div>

                  <div className="concierge-assistant-content">
                    <div className="concierge-bubble assistant-bubble">
                      {showTypingDots && (
                        <div className="concierge-typing-dots" aria-label="TGM is formulating response">
                          <span className="dot dot-1" />
                          <span className="dot dot-2" />
                          <span className="dot dot-3" />
                        </div>
                      )}

                      {displayedAnswer && (
                        <div className="concierge-answer-text">
                          <p>{displayedAnswer}</p>
                        </div>
                      )}
                    </div>

                    <span className="concierge-message-time">
                      TGM Advisory Desk {isTyping && '· typing...'}
                    </span>

                    {/* Custom Question -> Relationship Manager / Agent Consultation Form */}
                    {showFollowUpCta && activeConversation.isCustom && (
                      <div className="concierge-form-card">
                        <div className="concierge-wa-text" style={{ marginBottom: '12px' }}>
                          <p className="concierge-wa-title">Relationship Manager Consultation Form</p>
                          <p className="concierge-wa-sub">
                            Send your enquiry directly to our advisory desk by email or WhatsApp.
                          </p>
                        </div>
                        <ContactEnquiryForm
                          compact
                          heading=""
                          initialPrompt={activeConversation.questionText}
                        />
                      </div>
                    )}

                    {/* Template Question -> WhatsApp CTA + Optional Email Form Toggle */}
                    {showFollowUpCta && !activeConversation.isCustom && (
                      <div className="concierge-whatsapp-card">
                        <div className="concierge-wa-text">
                          <p className="concierge-wa-title">Speak directly with our team</p>
                          <p className="concierge-wa-sub">
                            Have questions specific to your business? Message our advisory desk on WhatsApp or send a consultation enquiry.
                          </p>
                        </div>
                        <a
                          href={getWhatsAppUrl(activeConversation.questionText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-wa-concierge"
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
                          <span>Continue on WhatsApp</span>
                        </a>
                        {!showTemplateForm ? (
                          <button
                            type="button"
                            className="concierge-nav-reset-btn"
                            style={{ width: '100%', padding: '8px 12px', color: 'var(--forest)' }}
                            onClick={() => setShowTemplateForm(true)}
                          >
                            Or Contact Relationship Manager via Form
                          </button>
                        ) : (
                          <div style={{ marginTop: '6px', paddingTop: '10px', borderTop: '1px solid rgba(197, 159, 90, 0.25)' }}>
                            <ContactEnquiryForm
                              compact
                              heading="Send Consultation Enquiry:"
                              initialPrompt={activeConversation.questionText}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Navigation Strip when inside a Conversation */}
          {activeConversation && (
            <div className="concierge-footer-bar">
              <button
                type="button"
                className="concierge-nav-back-btn"
                onClick={handleBackToQuestions}
              >
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
                  <path d="M19 12H5m7 7-7-7 7-7" />
                </svg>
                <span>Explore other questions</span>
              </button>

              <button
                type="button"
                className="concierge-nav-reset-btn"
                onClick={handleBackToQuestions}
                title="Restart conversation"
              >
                Reset
              </button>
            </div>
          )}

          {/* Custom Question Input Bar */}
          <form className="concierge-composer" onSubmit={handleCustomQuestionSubmit}>
            <input
              type="text"
              className="concierge-composer-input"
              placeholder="Ask a different question..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              aria-label="Ask a custom question"
            />
            <button
              type="submit"
              className="concierge-composer-send"
              disabled={!customInput.trim()}
              aria-label="Send question"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
