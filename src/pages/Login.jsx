import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // demo users list
      const demoUsers = [
        { email: 'user@example.com', password: 'password', name: 'John Doe' },
        { email: 'demo@example.com', password: '123456', name: 'Demo User' }
      ];

      const user = demoUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) throw new Error('❌ Invalid email or password');

      // Save user to Redux
      dispatch(loginSuccess(user));

      // Save user to localStorage (for persistence)
      localStorage.setItem('user', JSON.stringify(user));

      setLoading(false);

      // redirect after login
      navigate('/profile');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="border p-4 rounded shadow" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-4 fw-bold">Login to Your Account</h3>

        {/* Error animation */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="alert alert-danger text-center py-2"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="user@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </motion.div>

          <div className="text-center">
            <small>
              Forgot your password? <Link to="/reset-password">Reset it</Link>
            </small>
          </div>

          <div className="text-center mt-3">
            <small>
              Don’t have an account? <Link to="/register">Create one</Link>
            </small>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="mb-1">Demo Accounts:</p>
          <small>Email: user@example.com | Password: password</small><br />
          <small>Email: demo@example.com | Password: 123456</small>
        </div>
      </div>
    </div>
  );
};

export default Login;
