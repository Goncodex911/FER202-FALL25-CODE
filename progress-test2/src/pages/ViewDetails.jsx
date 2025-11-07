import React from 'react';
import { Card, Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { usePaymentContext } from '../contexts/PaymentContext';
import { formatCurrency } from '../utils/formatter';

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPaymentById } = usePaymentContext();
  const p = getPaymentById(id);

  return (
    <>
      <NavigationHeader />
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Header as="h5">Payment Details</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>ID:</strong> {p?.id}</ListGroup.Item>
                <ListGroup.Item><strong>Semester:</strong> {p?.semester || '-'}</ListGroup.Item>
                <ListGroup.Item><strong>Course:</strong> {p?.course || '-'}</ListGroup.Item>
                <ListGroup.Item><strong>Amount:</strong> {formatCurrency(p?.amount)}</ListGroup.Item>
                <ListGroup.Item><strong>Date:</strong> {p?.date || '-'}</ListGroup.Item>
                <ListGroup.Item><strong>UserId:</strong> {p?.userId || '-'}</ListGroup.Item>
              </ListGroup>
              <Card.Body className="d-flex gap-2">
                <Button onClick={() => navigate(`/payments/${id}/edit`)} variant="warning">Edit</Button>
                <Button onClick={() => navigate(-1)} variant="secondary">Back</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewDetails;
