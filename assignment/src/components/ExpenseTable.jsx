function formatDate(d) {
  const date = new Date(d);
  return date.toLocaleDateString("vi-VN");
}

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Expense Management</h5>

        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{width:"120px"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 && (
              <tr><td colSpan="5" className="text-center">No expenses</td></tr>
            )}

            {expenses.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.amount}</td>
                <td>{e.category}</td>
                <td>{formatDate(e.date)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={()=>onEdit(e)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={()=>onDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
