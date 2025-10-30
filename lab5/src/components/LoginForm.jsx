// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuthDispatch } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuthDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    if (user) {
      navigate('/movies');
    } else {
      setError('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400, marginTop: 80 }}>
      <Card.Body>
        <Card.Title>Đăng nhập</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
