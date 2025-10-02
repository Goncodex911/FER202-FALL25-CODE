export default function Ex1() {
  return (
    <>
      {/* Banner */}
      <div className="p-5 mb-5 bg-light">
        <h1 className="fw-bold mb-0">Let&apos;s test the grid!</h1>
      </div>

      {/* Grid */}
      <div className="container mb-5">
        <div className="row text-center bg-secondary-subtle border">
          <div className="col-6 border py-3">First col</div>
          <div className="col-6 border py-3">Second col</div>
        </div>
        <div className="row text-center bg-secondary-subtle border border-top-0">
          <div className="col border py-3">col</div>
          <div className="col border py-3">col</div>
          <div className="col border py-3">col</div>
        </div>
        <div className="row text-center bg-secondary-subtle border border-top-0">
          <div className="col border py-3">col</div>
          <div className="col border py-3">col</div>
          <div className="col border py-3">col</div>
          <div className="col border py-3">col</div>
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
