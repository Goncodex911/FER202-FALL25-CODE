// src/components/HeroCarousel.jsx
const slides = [
  {
    img: "/images/hero-1.jpg",
    title: "Neapolitan Pizza",
    text: "If you are looking for traditional Italian pizza, the Neapolitan is the best option!",
  },
  {
    img: "/images/hero-2.jpg",
    title: "The Taste of Italy",
    text: "Fresh ingredients baked to perfection.",
  },
  {
    img: "/images/hero-3.jpg",
    title: "Wood-Fired Goodness",
    text: "Smoky aroma, crispy crust, melty cheese.",
  },
];

export default function HeroCarousel() {
  return (
    <header id="home">
      <div
        id="pizzaHero"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"       // tự chạy 5s/slide (tuỳ chọn)
        data-bs-pause="hover"         // hover để tạm dừng (tuỳ chọn)
      >
        {/* Indicators (chấm tròn) */}
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#pizzaHero"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : undefined}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {slides.map((s, idx) => (
            <div
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
              key={s.title}
            >
              <img src={s.img} className="d-block w-100 hero-img" alt={s.title} />
              <div className="carousel-caption hero-caption">
                <h2 className="display-6 fw-bold">{s.title}</h2>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls (mũi tên) */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#pizzaHero"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#pizzaHero"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </header>
  );
}
