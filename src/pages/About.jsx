import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Form,
  Button,
  Carousel,
  Badge
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const teamMembers = [
  { name: 'Kalam Ahmmed', role: 'Founder & CEO', img: '/src/assets/team/profile.jpg' },
  { name: 'Shamim Hasan', role: 'Creative Director', img: '/src/assets/team/profile.jpg' },
  { name: 'Khalid', role: 'Head of Marketing', img: '/src/assets/team/profile.jpg' },
];

const testimonials = [
  {
    id: 1,
    name: 'Nabila Ahmed',
    feedback: 'Royel Attire provides high-quality products and excellent customer service. Their styles always keep me looking fresh!',
    avatar: '/src/assets/testimonials/images.jpeg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Arif Chowdhury',
    feedback: 'I love their winter collection! Warm, stylish, and perfect for chilly days. Highly recommended.',
    avatar: '/src/assets/testimonials/images.jpeg',
    rating: 4,
  },
  {
    id: 3,
    name: 'Maya Khan',
    feedback: 'The team at Royel Attire really cares about their customers. Great mission and awesome products!',
    avatar: '/src/assets/testimonials/images.jpeg',
    rating: 5,
  },
];

const AboutPage = () => {
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => setContactData({ ...contactData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you for your message! We will get back to you soon.');
    setContactData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <motion.div
        className="text-center text-white py-5 mb-5 rounded-4 hero-section"
        style={{
          background: 'linear-gradient(270deg, #FF6F00, #FF3D00, #FF6F00)',
          backgroundSize: '600% 600%',
          animation: 'gradientAnimation 15s ease infinite',
          boxShadow: '0 4px 25px rgba(255,111,0,0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="fw-bold display-5">⚡ About Royel Attire</h1>
        <p className="fs-5 mb-2 opacity-90">Blending modern fashion with timeless quality.</p>
        {/* Sparkle effect */}
        <div className="sparkles"></div>
      </motion.div>

      {/* Brand Story */}
      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Image
              src="/src/assets/logo/royel attire.png"
              alt="Royel Attire Brand Story"
              fluid
              rounded
              style={{ maxHeight: 400, objectFit: 'cover', width: '100%' }}
            />
          </motion.div>
        </Col>
        <Col md={6}>
          <h3 className="fw-semibold mb-3">Our Story</h3>
          <p>
            Royel Attire started with a passion for blending modern fashion with timeless quality. Every garment empowers confidence and style.
          </p>
          <p>
            From classic Panjabi to trendy T-shirts and lifestyle accessories, our collection is curated with care and love.
          </p>
        </Col>
      </Row>

      {/* Mission & Vision */}
      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-sm p-3 h-100 border-0 rounded-4">
              <h4 className="fw-semibold mb-3 text-orange">Our Mission</h4>
              <p>Provide fashionable clothing that makes everyone feel special — sustainably and ethically.</p>
            </Card>
          </motion.div>
        </Col>
        <Col md={6}>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-sm p-3 h-100 border-0 rounded-4">
              <h4 className="fw-semibold mb-3 text-orange">Our Vision</h4>
              <p>To be the leading contemporary South Asian fashion brand worldwide with style and integrity.</p>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Team Section */}
      <h3 className="text-center fw-bold mb-4 text-orange">Meet The Team</h3>
      <Row className="g-4 mb-5">
        {teamMembers.map((member, i) => (
          <Col md={4} key={member.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Card className="text-center shadow-lg h-100 team-card border-0 rounded-4 hover-glow">
                <Card.Img
                  variant="top"
                  src={member.img}
                  alt={member.name}
                  style={{ height: 250, objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title className="fw-semibold">{member.name}</Card.Title>
                  <Card.Text className="text-muted">{member.role}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Contact & Map */}
      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <h3 className="fw-semibold mb-3 text-orange">Contact Us</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="contactName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your full name"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contactEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="your.email@example.com"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contactMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your message here..."
                name="message"
                value={contactData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="warning" className="text-white px-4">
              Send Message
            </Button>
            {formStatus && <p className="mt-3 text-success">{formStatus}</p>}
          </Form>
        </Col>

        <Col md={6}>
          <h3 className="fw-semibold mb-3 text-orange">Find Us Here</h3>
          <div className="map-wrapper">
            <iframe
              title="Royel Attire Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9021454142297!2d90.40633771543696!3d23.750869494631135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85e09154621%3A0x87fbbbd041f4eabb!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1691244464013!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: 12 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Col>
      </Row>

      {/* Testimonials Carousel */}
      <h3 className="text-center fw-bold mb-4 text-orange">What Our Customers Say</h3>
      <Carousel variant="dark" interval={5000} pause="hover" indicators controls>
        {testimonials.map(({ id, name, feedback, avatar, rating }) => (
          <Carousel.Item key={id}>
            <div className="d-flex flex-column align-items-center px-3">
              <Image
                src={avatar}
                alt={name}
                roundedCircle
                width={100}
                height={100}
                className="mb-3 shadow-sm"
                style={{ objectFit: 'cover' }}
              />
              <div className="mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} color={i < rating ? '#FF6F00' : '#ddd'} />
                ))}
              </div>
              <blockquote className="blockquote text-center">
                <p className="mb-3 fst-italic">&quot;{feedback}&quot;</p>
                <footer className="blockquote-footer">{name}</footer>
              </blockquote>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom Styles */}
      <style>{`
        .text-orange { color: #FF6F00 !important; }
        .hover-glow:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(255,111,0,0.3); transition: all 0.3s ease; }
        .hero-section { position: relative; }
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .map-wrapper iframe { box-shadow: 0 0 20px rgba(255,111,0,0.5); }
        .sparkles {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: sparkleMove 3s linear infinite;
        }
        @keyframes sparkleMove {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }
      `}</style>
    </Container>
  );
};

export default AboutPage;
