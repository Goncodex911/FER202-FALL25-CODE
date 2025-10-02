export default function Ex2() {
  return (
    <>
      <div className="p-5 bg-light text-center mb-5">
        <h2 className="fw-bold mb-0">My First Bootstrap Page</h2>
      </div>

      <div className="container">
        <div className="row justify-content-center text-center gy-4">
          <div className="col-12 col-md-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
              alt="HTML5"
              style={{ width: 220, maxWidth: "100%" }}
            />
          </div>
          <div className="col-12 col-md-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
              alt="CSS3"
              style={{ width: 220, maxWidth: "100%" }}
            />
          </div>
          <div className="col-12 col-md-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg"
              alt="Bootstrap"
              style={{ width: 220, maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
