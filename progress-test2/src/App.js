// src/App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { UserProvider } from './contexts/UserContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </PaymentProvider>
    </AuthProvider>
  );
}
