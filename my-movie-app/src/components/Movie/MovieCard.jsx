// src/components/Movie/MovieCard.jsx

import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Badge } from "react-bootstrap";
import "./MovieCard.css"; // <-- 1. Import file CSS

export default function MovieCard({ movie }) {
  const { poster, title, description, year, country, duration, genre } = movie;

  return (
    <Card className="h-100">
      {/* 2. Thêm className="movie-card-img" vào đây */}
      <Card.Img variant="top" src={poster} alt={title} className="movie-card-img" /> 
      
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{fontSize: '0.9rem'}}>
          {description.substring(0, 100)}...
        </Card.Text>
        <div className="mt-auto">
            <p className="mb-1"><strong>Year:</strong> {year} | <strong>Country:</strong> {country} | <strong>Duration:</strong> {duration} min</p>
            <div><strong>Genre:</strong> <Badge bg="info">{genre}</Badge></div>
            <div className="d-flex justify-content-between mt-3">
                <Button variant="primary" size="sm">Views Details</Button>
                <Button variant="outline-warning" size="sm">Add to Favourites</Button>
            </div>
        </div>
      </Card.Body>
    </Card>
  );
}