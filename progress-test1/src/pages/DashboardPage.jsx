import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationHeader />
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Payments</h4>
          <Button onClick={() => navigate('/payments/add')}>Add Payment</Button>
        </div>

        <FilterBar />

        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Payment List</Card.Header>
          <Card.Body>
            <PaymentTable />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DashboardPage;
