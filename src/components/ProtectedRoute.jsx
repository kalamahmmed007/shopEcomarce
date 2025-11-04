// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors';
import { Navigate } from 'react-router-dom';

/**
 * Usage:
 * <ProtectedRoute>
 *    <Profile />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children }) => {
    const user = useSelector(selectUser);

    if (!user) {
        // Not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // Logged in, render child component
    return children;
};

export default ProtectedRoute;
