import { useEffect, useState } from "react";

const CATEGORY_OPTIONS = [
  "Entertainment",
  "Food",
  "Mua sắm",
  "Utilities"
];

export default function ExpenseForm({ editingExpense, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      setName("");
      setAmount("");
      setCategory("");
      setDate("");
    }
    setErr("");
  }, [editingExpense]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErr("Name cannot be empty");
      return;
    }
    if (!category) {
      setErr("Please select a category");
      return;
    }
    if (Number(amount) <= 0) {
      setErr("Amount must be > 0");
      return;
    }
    if (!date) {
      setErr("Date required");
      return;
    }

    onSubmit({
      ...editingExpense,
      name,
      amount: Number(amount),
      category,
      date
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </h5>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={submit}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-6 mb-2">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="col-6 mb-2">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="btn btn-primary me-2">
            {editingExpense ? "Update" : "Add Expense"}
          </button>

          {editingExpense && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
