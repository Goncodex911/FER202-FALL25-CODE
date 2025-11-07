// src/components/users/UserFilter.jsx
import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useUsers } from '../contexts/UserContext';

const UserFilter = () => {
  const { filters, setFilter } = useUsers();

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header as="h5">User Filter</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} md={4}>
              <Form.Group>
                <Form.Label>Search (Username/FullName)</Form.Label>
                <Form.Control
                  value={filters.query}
                  onChange={(e)=>setFilter('query', e.target.value)}
                  placeholder="Search users..."
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select value={filters.role} onChange={e=>setFilter('role', e.target.value)}>
                  <option value="">All</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select value={filters.status} onChange={e=>setFilter('status', e.target.value)}>
                  <option value="">All</option>
                  <option value="active">active</option>
                  <option value="blocked">blocked</option>
                  <option value="locked">locked</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <Form.Group>
                <Form.Label>Sort by</Form.Label>
                <Form.Select value={filters.sort} onChange={e=>setFilter('sort', e.target.value)}>
                  <option value="id_asc">ID ↑</option>
                  <option value="id_desc">ID ↓</option>
                  <option value="username_asc">Username A→Z</option>
                  <option value="username_desc">Username Z→A</option>
                  <option value="fullName_asc">FullName A→Z</option>
                  <option value="fullName_desc">FullName Z→A</option>
                  <option value="role_asc">Role A→Z</option>
                  <option value="role_desc">Role Z→A</option>
                  <option value="status_asc">Status A→Z</option>
                  <option value="status_desc">Status Z→A</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserFilter;
