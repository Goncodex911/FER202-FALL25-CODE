export default function Ex4() {
  return (
    <>
      {/* Header cam + logo + menu */}
      <header className="text-center py-4" style={{ backgroundColor: "#e78d2f" }}>
        <div className="container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
            alt="FPT Education"
            style={{ height: 90, background: "#fff", padding: "12px" }}
            className="mb-2"
          />
          <nav className="mt-2">
            <a href="#home" className="mx-2 text-dark text-decoration-none">Home</a>
            <a href="#about" className="mx-2 text-dark text-decoration-none">About</a>
            <a href="#contact" className="mx-2 text-dark text-decoration-none">Contact</a>
          </nav>
        </div>
      </header>

      {/* About & Contact */}
      <main className="container text-center my-5">
        <section id="about" className="mb-5">
          <h3 className="fw-bold mb-3">About</h3>
          <p className="text-secondary mb-0">This is the about section of the website.</p>
        </section>

        <section id="contact" className="mb-5">
          <h3 className="fw-bold mb-3">Contact</h3>
          <p className="text-secondary mb-0">
            For any inquiries, please contact us at example@example.com.
          </p>
        </section>
      </main>

      {/* Footer cam nhạt */}
      <footer className="text-center py-3" style={{ backgroundColor: "#efc77f" }}>
        © 2023 Website. All rights reserved.
      </footer>
    </>
  );
}
