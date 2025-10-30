// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import MovieManager from './pages/MovieManager';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuthState } from './contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthState();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <MovieManager />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/movies" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
