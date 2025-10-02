export default function Ex3() {
  return (
    <>
      {/* Banner */}
      <div className="p-5 bg-light">
        <h1 className="fw-bold mb-0">Let&apos;s test the grid!</h1>
      </div>

      {/* Nav Links */}
      <ul className="nav my-4 ms-3">
        <li className="nav-item"><a className="nav-link active" href="#!">Active</a></li>
        <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
        <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
        <li className="nav-item"><span className="nav-link disabled">Disabled</span></li>
      </ul>

      {/* Grid */}
      <div className="container mb-5">
        <div className="row g-0 text-center bg-secondary-subtle">
          <div className="col-6 border border-dark-subtle p-3">First col</div>
          <div className="col-6 border border-dark-subtle p-3">Second col</div>
        </div>
          <div className="row g-0 text-center bg-secondary-subtle">
    <div className="col border border-dark-subtle p-3">col</div>
    <div className="col border border-dark-subtle p-3">col</div>
    <div className="col border border-dark-subtle p-3">col</div>
  </div>

  {/* Hàng 3: 4 cột */}
  <div className="row g-0 text-center bg-secondary-subtle">
    <div className="col border border-dark-subtle p-3">col</div>
    <div className="col border border-dark-subtle p-3">col</div>
    <div className="col border border-dark-subtle p-3">col</div>
    <div className="col border border-dark-subtle p-3">col</div>
  </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-3 fw-bold"
        style={{ backgroundColor: "#d9c7c7", fontSize: "2rem" }}
      >
        Created by ABC!
      </footer>
    </>
  );
}
