import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post('/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const userData = res.data;
      dispatch(loginSuccess(userData));
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || '❌ Registration failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const errorVariants = {
    hidden: { x: 0 },
    visible: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="border p-4 rounded shadow" style={{ width: '100%', maxWidth: 450 }}>
        <h3 className="text-center fw-bold mb-4">Create Your Account</h3>

        {error && (
          <motion.div
            className="alert alert-danger text-center"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
          >
            {error}
          </motion.div>
        )}

        <motion.form onSubmit={handleSubmit} initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="mb-3" variants={fieldVariants}>
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={loading}
              />
            </div>
          </motion.div>

          <motion.div className="mb-3" variants={fieldVariants}>
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                disabled={loading}
              />
            </div>
          </motion.div>

          <motion.div className="mb-3" variants={fieldVariants}>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                disabled={loading}
              />
            </div>
          </motion.div>

          <motion.div className="mb-4" variants={fieldVariants}>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                disabled={loading}
              />
            </div>
          </motion.div>

          <motion.div className="d-grid" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </motion.div>
        </motion.form>

        <motion.p className="text-center mt-3" variants={fieldVariants}>
          Already have an account? <Link to="/login">Login</Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
