export default function Ex5() {
  const card = (img, id, name, province, groupName) => (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <div className="small text-secondary mb-1">{id}</div>
          <div className="fw-semibold">{name}</div>
          <div className="small text-secondary mb-2">{province}</div>

          <div className="d-flex align-items-center gap-4 mb-2">
            <label className="form-check-label">
              <input className="form-check-input me-1" type="radio" name={id} /> Absent
            </label>
            <label className="form-check-label">
              <input className="form-check-input me-1" type="radio" name={id} /> Present
            </label>
          </div>

          <button className="btn btn-warning btn-sm">Submit</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Top bar */}
      <div className="py-2" style={{ backgroundColor: "#efd3b6" }}>
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg/1200px-Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg.png"
              alt="FPT"
              style={{ height: 28 }}
            />
            <div className="small">
              <a href="#!" className="text-dark text-decoration-none me-2">Trang chủ</a>
              <a href="#!" className="text-dark text-decoration-none me-2">English</a>
              <a href="#!" className="text-dark text-decoration-none">Liên hệ</a>
            </div>
          </div>
          <div>
            <input className="form-control form-control-sm" placeholder="Search..." style={{ width: 200 }} />
          </div>
        </div>
      </div>

      {/* Hero ảnh cam */}
      <div style={{ backgroundColor: "#e78d2f" }}>
        <div className="container py-3">
          <img
            className="img-fluid d-block mx-auto"
            alt="FPT Students"
            src="https://static.tuoitre.vn/tto/i/s626/2016/08/29/anh-1472440134.jpg"
          />
        </div>
      </div>

      {/* Breadcrumb + title */}
      <div className="container my-4">
        <nav aria-label="breadcrumb">
  <ol className="breadcrumb bg-light p-3 padding-3 rounded-2">
    <li className="breadcrumb-item">
      <a href="#!" className="text-decoration-none fw-bold" style={{ color: "#e78d2f" }}>
        Home
      </a>
    </li>
    <li className="breadcrumb-item active text-secondary" aria-current="page">
      Students
    </li>
  </ol>
</nav>

        {/* Cards */}
      <div className="container my-4">
  <h3 className="text-center mb-4">Students Detail</h3>
  <div className="row g-4">
    <div className="col-12 col-md-6">
      {card("https://cdnphoto.dantri.com.vn/EoqR_dOwT6EXySqpbMfdhkmo0gI=/thumb_w/1020/2023/04/28/dantri-lo-trinh-hoc-tap-len-cac-cap-hoc-cao-hon-cho-hoc-sinh-phan-luong-sau-thcs-theo-giao-duc-nghe-nghiep-anhntv34docx-1682651902124.jpeg","DE190634","Nguyễn Lương Hiếu Thuận","Đà Nẵng") }
    </div>
    <div className="col-12 col-md-6">
       {card("https://cdnphoto.dantri.com.vn/EoqR_dOwT6EXySqpbMfdhkmo0gI=/thumb_w/1020/2023/04/28/dantri-lo-trinh-hoc-tap-len-cac-cap-hoc-cao-hon-cho-hoc-sinh-phan-luong-sau-thcs-theo-giao-duc-nghe-nghiep-anhntv34docx-1682651902124.jpeg","DE190112","Đỗ Văn Thành Công","Đà Nẵng") }
    </div>
    <div className="col-12 col-md-6">
      {card("https://cdnphoto.dantri.com.vn/EoqR_dOwT6EXySqpbMfdhkmo0gI=/thumb_w/1020/2023/04/28/dantri-lo-trinh-hoc-tap-len-cac-cap-hoc-cao-hon-cho-hoc-sinh-phan-luong-sau-thcs-theo-giao-duc-nghe-nghiep-anhntv34docx-1682651902124.jpeg","DE191999","Võ Hà Đông","Đà Nẵng") }
    </div>
    <div className="col-12 col-md-6">
      {card("https://cdnphoto.dantri.com.vn/EoqR_dOwT6EXySqpbMfdhkmo0gI=/thumb_w/1020/2023/04/28/dantri-lo-trinh-hoc-tap-len-cac-cap-hoc-cao-hon-cho-hoc-sinh-phan-luong-sau-thcs-theo-giao-duc-nghe-nghiep-anhntv34docx-1682651902124.jpeg","DE210924","Lê Công Vinh","Huế") }
    </div>
  </div>
</div>

      </div>

      {/* Footer */}
      <footer className="mt-5 text-white" style={{ backgroundColor: "#e78d2f" }}>
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-6">
              <h5>Our Address</h5>
              <div className="small">
                Khu đô thị FPT Đà Nẵng<br />
                <span>☎</span> +84 235 652 4127<br />
                <span>✉</span> fptu@fpt.edu.vn
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="mb-2">G • f • in • Y • ✉</div>
              <div>© Copyright 2023</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
