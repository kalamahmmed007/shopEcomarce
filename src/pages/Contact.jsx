import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="bg-white shadow-lg p-5 rounded-4 w-100"
        style={{ maxWidth: 700, border: '1px solid #f0f0f0' }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: '#FF6F00', fontWeight: 700 }}
        >
          Contact Us
        </h2>

        {submitted && (
          <div className="alert alert-success text-center" role="alert">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="form-label fw-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control form-control-lg"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control form-control-lg"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="form-label fw-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className="form-control form-control-lg"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              disabled={loading}
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-warning text-white btn-lg fw-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
