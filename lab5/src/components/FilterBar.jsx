// src/components/FilterBar.jsx
import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
  const { genres, keyword, filterGenreId, filterDuration, sortBy } = useMovieState();
  const { dispatch } = useMovieDispatch();

  return (
    <Row className="mt-4 g-3">
      <Col md={3}>
        <Form.Control
          type="text"
          placeholder="Tìm theo tên phim..."
          value={keyword}
          onChange={(e) => dispatch({ type: 'SET_KEYWORD', payload: e.target.value })}
        />
      </Col>
      <Col md={3}>
        <Form.Select
          value={filterGenreId}
          onChange={(e) => dispatch({ type: 'SET_FILTER_GENRE', payload: e.target.value })}
        >
          <option value="">-- Lọc theo thể loại --</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select
          value={filterDuration}
          onChange={(e) => dispatch({ type: 'SET_FILTER_DURATION', payload: e.target.value })}
        >
          <option value="">-- Thời lượng --</option>
          <option value="short">≤ 100 phút</option>
          <option value="long">&gt; 100 phút</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={sortBy} onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value })}>
          <option value="">-- Sắp xếp --</option>
          <option value="title_asc">Tên A → Z</option>
          <option value="title_desc">Tên Z → A</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default FilterBar;
