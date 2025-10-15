// src/components/Account/AboutForm.jsx
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

export default function AboutForm() {
  return (
    <Form>
        <h4><PersonCircle className="me-2" />About</h4>
        <Row>
            <Col md={6}><Form.Group controlId="firstName"><Form.Label>First Name</Form.Label><Form.Control type="text" isInvalid /></Form.Group></Col>
            <Col md={6}><Form.Group controlId="lastName"><Form.Label>Last Name</Form.Label><Form.Control type="text" /></Form.Group></Col>
        </Row>
        <Form.Group controlId="email"><Form.Label>Email</Form.Label><Form.Control type="email" isInvalid /><Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback></Form.Group>
        {/* Thêm các trường khác: Phone, Age, Avatar... */}
    </Form>
  );
}