// src/pages/UserList.jsx
import React from 'react';
import { Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';

const UserList = () => {
  return (
    <>
      <NavigationHeader />
      <Container>
        <Card className="mb-3 shadow-sm">
          <Card.Header as="h5">User Management</Card.Header>
          <Card.Body>
            <UserFilter />
            <UserTable />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserList;
