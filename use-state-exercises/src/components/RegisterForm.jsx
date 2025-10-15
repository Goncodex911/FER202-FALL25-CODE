import React, { useState } from 'react';
import { Form, Button, Card, Container, Modal, Toast } from 'react-bootstrap';

function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[A-Za-z0-9_.]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!usernameRegex.test(form.username.trim())) newErrors.username = 'Username ≥ 3 ký tự, chỉ chứa chữ/số/_.';
    if (!emailRegex.test(form.email.trim())) newErrors.email = 'Email không hợp lệ.';
    if (!passRegex.test(form.password)) newErrors.password = 'Password ≥ 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.';
    if (form.confirm !== form.password) newErrors.confirm = 'Mật khẩu không khớp.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirm: '' });
    setErrors({});
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header><h3 className="text-center">Register Form</h3></Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {['username','email','password','confirm'].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  type={field.includes('password') ? 'password' : 'text'}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  isInvalid={!!errors[field]}
                />
                <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
              </Form.Group>
            ))}
            <Button type="submit" variant="success" disabled={Object.keys(errors).length > 0}>
              Submit
            </Button>{' '}
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          </Form>
        </Card.Body>
      </Card>

      <Toast
        show={showToast}
        delay={3000}
        autohide
        bg="success"
        style={{ position: 'fixed', top: 20, right: 20 }}
      >
        <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Registration Successful</Modal.Title></Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h5>Username: {form.username}</h5>
              <p>Email: {form.email}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export default RegisterForm;
