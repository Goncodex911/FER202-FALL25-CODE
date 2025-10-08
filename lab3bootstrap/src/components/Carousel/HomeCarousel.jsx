import { Carousel, Badge } from "react-bootstrap";
import { carouselMovies } from "../../data/carousel";
import "./HomeCarousel.css"; // thêm file css riêng

export default function HomeCarousel() {
  if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;

  return (
    <Carousel interval={4000} fade indicators={true} controls={true}>
      {carouselMovies.map((m) => (
        <Carousel.Item key={m.id}>
          {/* Ảnh nền */}
          <div className="carousel-img-wrapper">
            <img
              className="d-block w-100 carousel-img"
              src={m.poster}
              alt={m.title}
            />
      
            <div className="carousel-overlay"></div>
          </div>

          <Carousel.Caption className="carousel-caption-custom">
            <h2 className="carousel-title">
              {m.title}
              <Badge bg="info" className="text-dark ms-2">
                {m.genre}
              </Badge>
              <Badge bg="secondary" className="ms-2">
                {m.year}
              </Badge>
            </h2>
            <p className="carousel-desc">{m.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
