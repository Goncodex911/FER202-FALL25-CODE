import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/expenseSlice";

const CATEGORY_OPTIONS = [
  "Entertainment",
  "Food",
  "Mua sắm",
  "Utilities"
];

export default function ExpenseFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((s) => s.expenses.filter);

  const handleChange = (e) => {
    const value = e.target.value;
    // "" = All categories
    dispatch(setFilter(value));
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title mb-3">Filter</h5>

        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={filter}
          onChange={handleChange}
        >
          <option value="">All categories</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
