// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="container text-center py-5" style={{ minHeight: '80vh', position: 'relative', overflow: 'hidden' }}>
      {/* Floating shapes */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{ position: 'absolute', top: '10%', left: '15%', fontSize: '3rem', color: '#ffc107' }}
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        style={{ position: 'absolute', top: '50%', right: '20%', fontSize: '2rem', color: '#0d6efd' }}
      >
        🌟
      </motion.div>

      <motion.h1
        className="display-1 fw-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        404
      </motion.h1>

      <motion.h3
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Oops! Page Not Found
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        The page you are looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="btn btn-primary mt-3">
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
