import React, { useEffect } from 'react';
import { Container, Card, ListGroup, Row, Col, Button } from 'react-bootstrap';
import {
  FaTruck,
  FaClock,
  FaMapMarkedAlt,
  FaGlobe,
  FaQuestionCircle,
  FaPhoneAlt,
} from 'react-icons/fa';

const ShippingPage = () => {
  useEffect(() => {
    document.title = 'Shipping Information | Royel Attire';
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #fff7f0, #ffffff)',
        minHeight: '100vh',
        paddingTop: '40px',
        paddingBottom: '60px',
      }}
    >
      <Container style={{ maxWidth: 900 }}>
        <h1
          className="fw-bold text-center mb-5"
          style={{
            color: '#FF6F00',
            letterSpacing: '1px',
            textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        >
          Shipping Information
        </h1>

        {shippingSections.map((section, i) => (
          <Card
            key={i}
            className="shadow-lg mb-4 border-0 rounded-4 transition-all"
            style={{
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={2} className="text-center">
                  {section.icon}
                </Col>
                <Col>
                  <h4
                    style={{
                      color: '#FF6F00',
                      borderLeft: '4px solid #FF6F00',
                      paddingLeft: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    {section.title}
                  </h4>
                  {section.content}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

        {/* Support Callout */}
        <Card
          className="text-center border-0 shadow-lg rounded-4 mt-5 p-4"
          style={{ backgroundColor: '#FFF4E5' }}
        >
          <FaPhoneAlt size={40} color="#FF6F00" className="mb-3" />
          <h5 className="fw-bold" style={{ color: '#FF6F00' }}>
            Need More Help?
          </h5>
          <p className="text-muted mb-3">
            Our support team is always here for your questions or concerns.
          </p>
          <Button
            variant="warning"
            href="/contact"
            className="px-4 text-white fw-semibold"
            style={{ backgroundColor: '#FF6F00', border: 'none' }}
          >
            Contact Us
          </Button>
        </Card>
      </Container>
    </div>
  );
};

const shippingSections = [
  {
    icon: <FaTruck size={50} color="#FF6F00" />,
    title: 'Shipping Options & Costs',
    content: (
      <>
        <p>
          We offer flexible shipping options to get your order delivered quickly and safely:
        </p>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Standard Shipping:</strong> 3–7 business days. Cost depends on location and order
            value.
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Express Shipping:</strong> 1–3 business days. Higher fee applies.
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Free Shipping:</strong> Orders over BDT 5,000 within Bangladesh.
          </ListGroup.Item>
        </ListGroup>
      </>
    ),
  },
  {
    icon: <FaClock size={50} color="#FF6F00" />,
    title: 'Delivery Times',
    content: (
      <>
        <p>
          Delivery depends on your location and chosen shipping option. Please allow extra time during
          holidays or unexpected delays.
        </p>
        <p>You’ll receive a tracking number once your order ships.</p>
      </>
    ),
  },
  {
    icon: <FaMapMarkedAlt size={50} color="#FF6F00" />,
    title: 'Order Tracking',
    content: (
      <p>
        Use your tracking number to monitor your shipment on the courier’s website. For any assistance,
        contact our support team.
      </p>
    ),
  },
  {
    icon: <FaGlobe size={50} color="#FF6F00" />,
    title: 'International Shipping',
    content: (
      <p>
        Currently, we only deliver within Bangladesh — but international shipping is coming soon!
      </p>
    ),
  },
  {
    icon: <FaQuestionCircle size={50} color="#FF6F00" />,
    title: 'Frequently Asked Questions',
    content: (
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>How do I know when my order has shipped?</strong>
          <br />
          You’ll receive an email with your tracking number once dispatched.
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>What if my package is delayed?</strong>
          <br />
          Delays may occur due to weather or courier issues. Contact support if it’s late.
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Can I change my address after ordering?</strong>
          <br />
          Address changes are allowed within 1 hour of placing your order. Reach out ASAP.
        </ListGroup.Item>
      </ListGroup>
    ),
  },
];

export default ShippingPage;
