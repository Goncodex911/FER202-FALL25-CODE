import Topbar from './components/Topbar';
import HeroCarousel from './components/HeroCarousel';
import MenuGrid from './components/MenuGrid';
import Booking from './components/Booking';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Topbar />
      <HeroCarousel />

      {/* Our Menu section - nền tối */}
      <section className="py-5 section-dark">
        <div className="container">
          <h2 className="section-title">Our Menu</h2>
          <MenuGrid />
        </div>
      </section>

      {/* Booking section - nền tối */}
      <section className="py-5 section-dark">
        <div className="container">
          <h2 className="section-title">Book Your Table</h2>
          <Booking />
        </div>
      </section>

      <Footer />
    </>
  );
}
