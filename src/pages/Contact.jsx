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
        className="bg-white shadow-lg p-5 rounded-4 w-100 position-relative"
        style={{
          maxWidth: 700,
          border: '1px solid #eee',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Gradient top bar */}
        <div
          style={{
            height: '6px',
            width: '100%',
            background: 'linear-gradient(90deg, #FF6F00, #FFA726)',
            position: 'absolute',
            top: 0,
            left: 0,
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
          }}
        ></div>

        <h2
          className="text-center mb-4 mt-2"
          style={{
            color: '#FF6F00',
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '1px',
          }}
        >
          Contact Us
        </h2>

        {submitted && (
          <div
            className="alert alert-success text-center fw-semibold fade show"
            role="alert"
            style={{ borderRadius: '12px' }}
          >
            🎉 Message sent! We’ll reach out soon.
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
              className="form-control form-control-lg border-0 shadow-sm"
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                transition: '0.3s ease',
              }}
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              disabled={loading}
              onFocus={(e) => (e.target.style.backgroundColor = '#fff')}
              onBlur={(e) => (e.target.style.backgroundColor = '#f9f9f9')}
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
              className="form-control form-control-lg border-0 shadow-sm"
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
              }}
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              disabled={loading}
              onFocus={(e) => (e.target.style.backgroundColor = '#fff')}
              onBlur={(e) => (e.target.style.backgroundColor = '#f9f9f9')}
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
              className="form-control form-control-lg border-0 shadow-sm"
              style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                resize: 'vertical',
              }}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              disabled={loading}
              onFocus={(e) => (e.target.style.backgroundColor = '#fff')}
              onBlur={(e) => (e.target.style.backgroundColor = '#f9f9f9')}
            ></textarea>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-lg fw-semibold text-white"
              style={{
                background:
                  'linear-gradient(90deg, #FF6F00 0%, #FFA726 100%)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(255,111,0,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = 'translateY(-2px)')
              }
              onMouseLeave={(e) =>
                (e.target.style.transform = 'translateY(0)')
              }
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
