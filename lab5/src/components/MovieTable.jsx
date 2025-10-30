// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const {
    movies,
    genres,
    loading,
    movieToDelete,
    showDeleteModal,
    keyword,
    filterGenreId,
    filterDuration,
    sortBy,
  } = state;

  // map id -> name
  const genreMap = genres.reduce((acc, g) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  // FILTER CLIENT-SIDE
  let filtered = [...movies];

  if (keyword) {
    filtered = filtered.filter((m) =>
      m.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  if (filterGenreId) {
    filtered = filtered.filter((m) => String(m.genreId) === String(filterGenreId));
  }

  if (filterDuration === 'short') {
    filtered = filtered.filter((m) => m.duration <= 100);
  } else if (filterDuration === 'long') {
    filtered = filtered.filter((m) => m.duration > 100);
  }

  if (sortBy === 'title_asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'title_desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <>
      {loading && <p>Đang tải...</p>}
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Thời lượng</th>
            <th>Năm</th>
            <th>Quốc gia</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id}>
              <td>
                {m.avatar ? (
                  <Image src={m.avatar} alt={m.title} style={{ width: 50, height: 50, objectFit: 'cover' }} rounded />
                ) : (
                  'N/A'
                )}
              </td>
              <td>{m.id}</td>
              <td>{m.title}</td>
              <td>{genreMap[m.genreId] || 'Unknown'}</td>
              <td>{m.duration} phút</td>
              <td>{m.year}</td>
              <td>{m.country}</td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                  onClick={() => dispatch({ type: 'OPEN_EDIT_MODAL', payload: m })}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => dispatch({ type: 'OPEN_DELETE_MODAL', payload: m })}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* modal xóa */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa phim: <strong>{movieToDelete?.title}</strong> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
