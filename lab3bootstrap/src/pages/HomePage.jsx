// src/pages/HomePage.jsx
import HomeCarousel from "../components/Carousel/HomeCarousel";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../components/Movies/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />

      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>

        <Row className="g-4">
          {movies.map((m) => (
            <Col key={m.id} xs={12} md={6} lg={4}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
