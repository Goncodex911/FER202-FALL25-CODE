// src/components/NavBar/NavBar.jsx
import React from 'react';
import { Navbar, Nav, NavDropdown, Form, InputGroup, Button, Container } from 'react-bootstrap';
import { PersonCircle, StarFill, BoxArrowInRight } from 'react-bootstrap-icons';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex me-3">
            <InputGroup>
              <Form.Control type="search" placeholder="Quick Search" aria-label="Search" />
              <Button variant="outline-success">Search</Button>
            </InputGroup>
          </Form>
          <Nav>
            <Nav.Link href="#favourites" className="d-flex align-items-center">
              <StarFill className="me-1" /> Favourites
            </Nav.Link>
            <NavDropdown title={<PersonCircle size={24} />} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="#action/3.1">Manage Your Profiles</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Build your Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Change Password</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#login" className="d-flex align-items-center">
              <BoxArrowInRight className="me-1" /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}