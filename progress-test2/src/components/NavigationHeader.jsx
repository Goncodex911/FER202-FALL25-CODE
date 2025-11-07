import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import AvatarImg from './common/AvatarImg'; // ⬅️ thêm

const NavigationHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.fullName || user?.username || 'Student';

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/home">TuitionTracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/users">User Management</Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center" style={{ gap: 10 }}>
            {/* Avatar + name */}
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <AvatarImg src={user?.avatar} size={28} />
              <Navbar.Text>
                Signed in as: <strong>{fullName}</strong>
              </Navbar.Text>
            </div>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;
