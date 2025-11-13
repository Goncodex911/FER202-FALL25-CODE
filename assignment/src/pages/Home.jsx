import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} from "../redux/expenseSlice";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseFilter from "../components/ExpenseFilter";
import ExpenseTable from "../components/ExpenseTable";
import TotalCard from "../components/TotalCard";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.user.current);
  const { items, filter } = useSelector(s => s.expenses);

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchExpenses(user.id));
  }, [dispatch, user]);

  const filtered = useMemo(() => {
    if (!filter) return items;          // "" = All categories
    return items.filter((e) => e.category === filter);
  }, [items, filter]);

  const total = filtered.reduce((s, e) => s + Number(e.amount), 0);

  const handleSubmit = (exp) => {
    if (editing) {
      dispatch(updateExpense(exp));
    } else {
      dispatch(addExpense({ ...exp, userId: user.id }));
    }
    setEditing(null);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <TotalCard total={total} />
        <ExpenseFilter />
        <ExpenseForm
          editingExpense={editing}
          onSubmit={handleSubmit}
          onCancel={()=>setEditing(null)}
        />
      </div>

      <div className="col-md-8">
        <ExpenseTable
          expenses={filtered}
          onEdit={setEditing}
          onDelete={(id)=>dispatch(deleteExpense(id))}
        />
      </div>
    </div>
  );
}
