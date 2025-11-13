function formatVND(num) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(num);
}

export default function TotalCard({ total }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Total of Expenses</h5>
        <h3>{formatVND(total)}</h3>
      </div>
    </div>
  );
}
