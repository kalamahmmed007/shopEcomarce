import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Royel Attire";
  }, []);

  return (
    <div style={{ background: 'linear-gradient(180deg, #fff7f0, #ffffff)', minHeight: '100vh' }}>
      <Container className="py-5" style={{ maxWidth: '850px' }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h1
              className="fw-bold text-center mb-4"
              style={{
                color: '#FF6F00',
                letterSpacing: '1px',
                textShadow: '0 1px 2px rgba(0,0,0,0.15)',
              }}
            >
              Privacy Policy
            </h1>

            <p className="text-muted">
              At <strong>Royel Attire</strong>, your privacy is our priority. This Privacy Policy explains how we collect,
              use, and protect your personal information when you visit our website or use our services.
            </p>

            <Section title="Information We Collect">
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, shipping address, phone number, and payment details.</li>
                <li><strong>Usage Data:</strong> How you use our website — pages visited, time spent, and interactions.</li>
                <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to improve your experience and gather analytics.</li>
              </ul>
            </Section>

            <Section title="How We Use Your Information">
              <ul>
                <li>To process your orders and manage your account.</li>
                <li>To communicate with you about your orders, promotions, and updates.</li>
                <li>To improve our website, products, and services.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </Section>

            <Section title="How We Protect Your Data">
              We implement strong security measures to protect your personal data from unauthorized access,
              alteration, disclosure, or destruction. Our website uses SSL encryption for secure data transmission.
            </Section>

            <Section title="Your Rights">
              <ul>
                <li>You can access, update, or delete your personal information by contacting our support.</li>
                <li>You may unsubscribe from marketing communications at any time.</li>
                <li>We never sell your personal information to third parties.</li>
              </ul>
            </Section>

            <Section title="Cookies Policy">
              Cookies help us offer a better experience by remembering your preferences and visit details.
              You can disable cookies in your browser settings, but some features may not function properly.
            </Section>

            <Section title="Changes to This Policy">
              We may update this Privacy Policy from time to time. All updates will be posted here with the revised date.
            </Section>

            <Section title="Contact Us">
              If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
              <a
                href="mailto:support@royelattire.com"
                style={{
                  color: '#FF6F00',
                  textDecoration: 'none',
                  fontWeight: '600',
                }}
                onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
              >
                support@royelattire.com
              </a>.
            </Section>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mt-4">
    <h4
      className="fw-semibold mb-2"
      style={{
        color: '#FF6F00',
        borderLeft: '4px solid #FF6F00',
        paddingLeft: '10px',
      }}
    >
      {title}
    </h4>
    <div className="text-muted">{children}</div>
  </div>
);

export default PrivacyPolicy;
