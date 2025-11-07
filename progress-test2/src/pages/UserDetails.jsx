// src/pages/UserDetails.jsx
import React from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';
import AvatarImg from '../components/common/AvatarImg';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { view } = useUsers();
  const u = view.find(x => String(x.id) === String(id));

  return (
    <>
      <NavigationHeader />
      <Container className="mt-3">
        <Card className="shadow-sm">
          <Card.Header as="h5" className="d-flex align-items-center" style={{ gap: 12 }}>
            <AvatarImg src={u?.avatar} size={48} /> {/* ⬅️ thêm */}
            User Details
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>ID:</strong> {u?.id}</ListGroup.Item>
            <ListGroup.Item><strong>Username:</strong> {u?.username}</ListGroup.Item>
            <ListGroup.Item><strong>Full Name:</strong> {u?.fullName}</ListGroup.Item>
            <ListGroup.Item><strong>Role:</strong> {u?.role}</ListGroup.Item>
            <ListGroup.Item><strong>Status:</strong> {u?.status}</ListGroup.Item>
          </ListGroup>
          <Card.Body><Button variant="secondary" onClick={()=>navigate(-1)}>Back</Button></Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserDetails;