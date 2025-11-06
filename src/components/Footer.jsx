// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [socialCounts, setSocialCounts] = useState({
    facebook: 0,
    instagram: 0,
    youtube: 0,
    fbGroup: 0,
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const brandColor = '#FF6F00';
  const bgColor = '#1e1e1e';
  const textColor = '#f1f1f1';
  const linkHoverStyle = { transition: 'color 0.3s' };
  const handleMouseEnter = (e) => (e.target.style.color = brandColor);
  const handleMouseLeave = (e) => (e.target.style.color = textColor);

  // ✅ Safe fetch with fallback mock data
  useEffect(() => {
    const fetchSocialCounts = async () => {
      try {
        const res = await fetch('/api/social-stats', { cache: 'no-store' });

        // If backend doesn’t return JSON, throw error manually
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid JSON response');
        }

        const data = await res.json();
        setSocialCounts({
          facebook: data.facebook ?? 2350,
          instagram: data.instagram ?? 4200,
          youtube: data.youtube ?? 1800,
          fbGroup: data.fbGroup ?? 600,
        });
      } catch (err) {
        console.warn('⚠️ Using mock social data (API failed):', err.message);
        // Fallback demo data
        setSocialCounts({
          facebook: 2350,
          instagram: 4200,
          youtube: 1800,
          fbGroup: 600,
        });
      }
    };

    fetchSocialCounts();
  }, []);

  const socialPlatforms = [
    {
      name: 'Facebook',
      count: socialCounts.facebook,
      label: 'Likes',
      icon: <FaFacebookF />,
      link: 'https://facebook.com/royel.attire',
      bg: '#3b5998',
    },
    {
      name: 'Instagram',
      count: socialCounts.instagram,
      label: 'Followers',
      icon: <FaInstagram />,
      link: 'https://instagram.com/roy.aleattire',
      bg: '#C13584',
    },
    {
      name: 'YouTube',
      count: socialCounts.youtube,
      label: 'Subscribers',
      icon: <FaYoutube />,
      link: 'https://youtube.com',
      bg: '#FF0000',
    },
    {
      name: 'FB Group',
      count: socialCounts.fbGroup,
      label: 'Members',
      icon: <FaFacebookF />,
      link: 'https://facebook.com/groups/yourgroup',
      bg: '#4267B2',
    },
  ];

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor }} className="pt-5 mt-5 border-top shadow-sm">
      <Container>
        <Row className="gy-4">
          {/* Customer Support */}
          <Col md={4}>
            <h5 className="fw-bold mb-3 text-white">Customer Support</h5>
            <p className="small text-light d-flex align-items-center mb-2">
              <FaPhoneAlt className="me-2" />
              <a
                href="tel:+880123456789"
                style={{ color: textColor, textDecoration: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                +880 1234 567 890
              </a>
            </p>
            <p className="small text-light d-flex align-items-center">
              <FaEnvelope className="me-2" />
              <a
                href="mailto:royaleattire27@gmail.com"
                style={{ color: textColor, textDecoration: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                royaleattire27@gmail.com
              </a>
            </p>
            <p className="small mt-3 text-light">
              Your trusted online clothing store with fast delivery and quality products.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Quick Links</h6>
            <ul className="list-unstyled">
              {['/', '/shop', '/about', '/contact'].map((path, i) => {
                const labels = ['Home', 'Shop', 'About', 'Contact'];
                return (
                  <li key={path} className="mb-1">
                    <Link
                      to={path}
                      className="text-decoration-none"
                      style={{ color: textColor, ...linkHoverStyle }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>

          {/* Support Links */}
          <Col md={2} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Support</h6>
            <ul className="list-unstyled">
              {['/faq', '/returns', '/shipping', '/privacy-policy'].map((path, i) => {
                const labels = ['FAQ', 'Returns', 'Shipping', 'Privacy Policy'];
                return (
                  <li key={path} className="mb-1">
                    <Link
                      to={path}
                      className="text-decoration-none"
                      style={{ color: textColor, ...linkHoverStyle }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>

          {/* Newsletter + Socials */}
          <Col md={4}>
            <h6 className="fw-bold mb-3 text-white">Subscribe for Updates</h6>
            <Form onSubmit={handleSubscribe}>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: brandColor, borderColor: brandColor }}
                >
                  Subscribe
                </Button>
              </InputGroup>
            </Form>

            <AnimatePresence>
              {subscribed && (
                <motion.small
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-success mt-2 d-block"
                >
                  ✅ Thank you for subscribing!
                </motion.small>
              )}
            </AnimatePresence>

            {/* Social Stats */}
            <div className="mt-4 d-flex flex-wrap gap-2">
              {socialPlatforms.map((platform, i) => (
                <a
                  key={i}
                  href={platform.link}
                  target="_blank"
                  rel="noreferrer"
                  className="d-flex flex-column align-items-center justify-content-center text-white text-decoration-none"
                  style={{
                    backgroundColor: platform.bg,
                    width: '110px',
                    height: '90px',
                    borderRadius: '12px',
                    padding: '10px',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <div className="mb-1" style={{ fontSize: '1.3rem' }}>
                    {platform.icon}
                  </div>
                  <div style={{ fontSize: '0.95rem' }}>{platform.name}</div>
                  <small style={{ fontWeight: 500, fontSize: '0.8rem' }}>
                    {platform.count.toLocaleString()} {platform.label}
                  </small>
                </a>
              ))}
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: '#444' }} />

        <Row>
          <Col className="text-center py-3">
            <small className="text-light">
              &copy; {new Date().getFullYear()}{' '}
              <span style={{ color: brandColor }}>Royel Attire</span>. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
