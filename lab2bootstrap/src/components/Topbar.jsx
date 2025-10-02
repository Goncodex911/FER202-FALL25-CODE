export default function Topbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand fw-semibold" href="#home">Pizza House</a>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#phNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="phNav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-3">
            <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>

          {/* search ở bên phải */}
          <form className="ms-auto d-flex" role="search" onSubmit={e => e.preventDefault()}>
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className="btn btn-warnings" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
