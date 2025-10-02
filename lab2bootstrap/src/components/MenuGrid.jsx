const items = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 24.00,
    oldPrice: 40.00,
    tag: 'SALE',
    img: '/images/menu-1.jpg'
  },
  {
    id: 2,
    name: 'Mushroom Pizza',
    price: 25.00,
    tag: '',
    img: '/images/menu-2.jpg'
  },
  {
    id: 3,
    name: 'Hawaiian Pizza',
    price: 30.00,
    tag: 'NEW',
    img: '/images/menu-3.jpg'
  },
  {
    id: 4,
    name: 'Pesto Pizza',
    price: 30.00,
    oldPrice: 50.00,
    tag: 'SALE',
    img: '/images/menu-4.jpg'
  }
];

export default function MenuGrid() {
  return (
    <div className="row g-4">
      {items.map(p => (
        <div key={p.id} className="col-12 col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm">

            {/* badge SALE/NEW ở góc trái trên */}
            {p.tag && <span className={`badge position-absolute top-0 start-0 m-2 ${p.tag === 'SALE' ? 'bg-warning text-dark' : 'bg-success'}`}>{p.tag}</span>}

            <img src={p.img} className="card-img-top menu-img" alt={p.name} />
            <div className="card-body d-flex flex-column">
              <h6 className="card-title">{p.name}</h6>

              {/* giá: có thể có oldPrice + price màu cam giống ảnh */}
              <div className="mt-auto">
                <div className="mb-2">
                  {p.oldPrice && <span className="text-muted text-decoration-line-through me-2">${p.oldPrice.toFixed(2)}</span>}
                  <span className="text-warning fw-semibold">${p.price.toFixed(2)}</span>
                </div>
                <button className="btn btn-dark w-100">Buy</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
