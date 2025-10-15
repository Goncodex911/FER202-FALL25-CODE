// src/components/Filter/Filter.jsx
import React from 'react';
import { Card, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';

export default function Filter() {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className="g-3 align-items-end">
          {/* Search */}
          <Col md={6} lg={4}>
            <Form.Group controlId="searchMovie">
              <Form.Label>Search Movie</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Search by title, description..." />
                <Button variant="outline-secondary">Search</Button>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* Filter by Year */}
          <Col md={6} lg={4}>
            <Form.Group controlId="filterYear">
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select aria-label="Filter by year">
                <option>All Years</option>
                <option value="1">Before 2000</option>
                <option value="2">2001 - 2015</option>
                <option value="3">After 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sorting */}
          <Col md={12} lg={4}>
            <Form.Group controlId="sortMovies">
              <Form.Label>Sort by</Form.Label>
              <Form.Select aria-label="Sort movies by">
                <option>Default</option>
                <option value="year-asc">Year (Ascending)</option>
                <option value="year-desc">Year (Descending)</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="duration-asc">Duration (Shortest First)</option>
                <option value="duration-desc">Duration (Longest First)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}