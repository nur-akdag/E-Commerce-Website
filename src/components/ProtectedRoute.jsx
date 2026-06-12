import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = useSelector(state => state.client.user); 
  
  
  if (!token && (!user || Object.keys(user).length === 0)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};