import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { usePaymentContext } from '../contexts/PaymentContext';

const FilterBar = () => {
  const { filters } = { filters: {} }; // placeholder để tránh lỗi 
  const {
    state,
    semesters,
    courses,
    setFilter,
    resetFilters,
  } = usePaymentContext();

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  value={state.filters.query}
                  placeholder="Search by semester or course name"
                  onChange={(e)=>setFilter('query', e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  value={state.filters.semester}
                  onChange={(e)=>setFilter('semester', e.target.value)}
                >
                  <option value="">All Semesters</option>
                  {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  value={state.filters.course}
                  onChange={(e)=>setFilter('course', e.target.value)}
                >
                  <option value="">All Courses</option>
                  {courses.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  value={state.filters.sort}
                  onChange={(e)=>setFilter('sort', e.target.value)}
                >
                  <option value="course_asc">tăng theo coursename</option>
                  <option value="course_desc">giảm theo coursename</option>
                  <option value="date_asc">tăng theo dữ liệu</option>
                  <option value="date_desc">giảm theo dữ liệu</option>
                  <option value="amount_asc">tăng theo tiền</option>
                  <option value="amount_desc">giảm theo tiền</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="secondary" onClick={resetFilters}>Reset</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
