// App.js
import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

// các page là file .jsx
import UsersPage from "./pages/UsersPage.jsx";
import PaymentsPage from "./pages/PaymentsPage.jsx";

function App() {
  return (
    <>
      {/* Thanh navbar trên cùng */}
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          {/* Logo / tên lab */}
          <Navbar.Brand as={Link} to="/users">
            Lab 6 – Redux Toolkit & Thunk
          </Navbar.Brand>

          {/* Menu điều hướng */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/payments">
              Payments
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Nội dung trang */}
      <Container className="my-4">
        <Routes>
          {/* Mặc định chuyển về /users */}
          <Route path="/" element={<Navigate to="/users" />} />

          {/* Trang danh sách users */}
          <Route path="/users" element={<UsersPage />} />

          {/* Trang thanh toán */}
          <Route path="/payments" element={<PaymentsPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
