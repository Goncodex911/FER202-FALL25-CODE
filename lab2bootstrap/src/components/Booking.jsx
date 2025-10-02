export default function Booking() {
  return (
    <form className="booking card card-body mx-auto booking-width">
      <div className="row g-3">
        <div className="col-12 col-lg-4">
          <input className="form-control" placeholder="Your Name *" />
        </div>
        <div className="col-12 col-lg-4">
          <input type="email" className="form-control" placeholder="Your Email *" />
        </div>
        <div className="col-12 col-lg-4">
          <select className="form-select">
            <option>Select a Service</option>
            <option>Dine in</option>
            <option>Take away</option>
            <option>Birthday party</option>
          </select>
        </div>

        <div className="col-12">
          <textarea className="form-control" rows="6" placeholder="Please write your comment"></textarea>
        </div>

        <div className="col-12">
          <button className="btn btn-warning px-4">Send Message</button>
        </div>
      </div>
    </form>
  );
}
