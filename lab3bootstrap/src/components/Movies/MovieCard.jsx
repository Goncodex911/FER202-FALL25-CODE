// src/components/Movies/MovieCard.jsx
import { useState } from "react";
import { Card, Button, Badge, Modal, Toast, ToastContainer } from "react-bootstrap";

const FAV_KEY = "favourites";

function getFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
  catch { return []; }
}
function saveFavs(list) {
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

function truncate(text, max = 120) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const addToFavourites = () => {
    const favs = getFavs();
    if (!favs.find((m) => m.id === movie.id)) {
      favs.push({ id: movie.id, title: movie.title, poster: movie.poster });
      saveFavs(favs);
    }
    setShowToast(true);
  };

  return (
    <>
      <Card className="h-100 shadow-sm border-0">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={`${movie.title} poster`}
          style={{ height: 220, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            <span>{movie.title}</span>
            <Badge bg="secondary">{movie.year}</Badge>
          </Card.Title>
          <div className="mb-2">
            <Badge bg="info" className="text-dark me-2">{movie.genre}</Badge>
            <Badge bg="light" text="dark">{movie.country}</Badge>
          </div>
          <Card.Text className="text-secondary">
            {truncate(movie.description)}
          </Card.Text>
          <div className="small text-muted mb-3">Duration: {movie.duration} mins</div>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={addToFavourites}>
              Add to Favourites
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowModal(true)}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={1800} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Favourites</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="img-fluid rounded mb-3"
          />
          <p><b>Genre:</b> {movie.genre}</p>
          <p><b>Year:</b> {movie.year}</p>
          <p><b>Country:</b> {movie.country}</p>
          <p><b>Duration:</b> {movie.duration} mins</p>
          <p className="mb-2"><b>Description:</b> {movie.description}</p>
          {Array.isArray(movie.showtimes) && movie.showtimes.length > 0 && (
            <p className="mb-0">
              <b>Showtimes:</b> {movie.showtimes.join(" · ")}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
