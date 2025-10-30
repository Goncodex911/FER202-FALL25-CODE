// src/components/HeaderBar.jsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          🎬 Movies Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <Nav>
              <Navbar.Text className="me-3">
                Đăng nhập: <strong>{user.fullName}</strong>
              </Navbar.Text>
              <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link onClick={() => navigate('/login')}>Đăng nhập</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderBar;
