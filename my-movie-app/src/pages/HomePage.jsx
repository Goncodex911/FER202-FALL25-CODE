import React from "react";
import HomeCarousel from "../components/carousel/HomeCarousel";
import MovieCard from '../components/Movie/MovieCard';
import { movies } from '../data/movies';
import { Row, Col } from 'react-bootstrap';
import Filter from "../components/Filter/Filter";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <div className="container mt-4">
        <h4>Featured Movies Collections</h4>
        
        {/* Thêm component Filter vào đây */}
        <Filter /> 

        {/* Movie List Section */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-2">
          {movies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}