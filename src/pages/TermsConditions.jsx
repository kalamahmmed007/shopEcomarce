import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';

const TermsConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | Royel Attire";
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
              Terms & Conditions
            </h1>

            <p className="text-muted">
              Welcome to <strong>Royel Attire</strong>. By accessing or using our website and services,
              you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>

            <Section title="Use of Website">
              You agree to use this website only for lawful purposes. You must not use it in any way that may damage,
              disable, or impair its functionality or interfere with others’ use.
            </Section>

            <Section title="Products and Services">
              We strive to provide accurate product information and images. However, we do not guarantee that descriptions
              or other content are error-free. Product availability, pricing, and specifications may change without notice.
            </Section>

            <Section title="Orders and Payment">
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order.
              Payment must be made through the provided methods. You are responsible for providing accurate payment and shipping information.
            </Section>

            <Section title="Shipping and Delivery">
              Shipping policies, delivery times, and costs are detailed on our Shipping Information page.
              We are not responsible for delays beyond our control.
            </Section>

            <Section title="Returns and Refunds">
              Returns and refund policies are outlined on our Returns & Exchanges page.
              Please review them carefully before purchasing.
            </Section>

            <Section title="Intellectual Property">
              All content on this website, including text, graphics, logos, and images, is the property of Royel Attire or its licensors.
              Unauthorized use is prohibited.
            </Section>

            <Section title="Limitation of Liability">
              Royel Attire shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.
            </Section>

            <Section title="Changes to Terms">
              We reserve the right to update these terms at any time. Changes will be posted on this page.
              Continued use of the website constitutes acceptance of the updated terms.
            </Section>

            <Section title="Governing Law">
              These terms are governed by the laws of Bangladesh. Any disputes will be resolved in the courts located there.
            </Section>

            <Section title="Contact Us">
              For questions regarding these terms, please contact us at{' '}
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

// Reusable section component
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
    <p className="text-muted">{children}</p>
  </div>
);

export default TermsConditions;
