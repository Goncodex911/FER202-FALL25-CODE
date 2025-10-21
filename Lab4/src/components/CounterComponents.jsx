import React, { useReducer } from "react";
import Button from "react-bootstrap/Button";

// 1) State ban đầu
const initialState = { count: 0 };

// 2) Reducer: nhận state + action => trả state mới
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      // nếu cần ràng buộc min/max, kiểm tra tại đây
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return initialState; // quay về 0
    default:
      return state; // action không khớp -> giữ nguyên
  }
}

export default function CounterComponent_useReducer() {
  // 3) Khởi tạo reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 4) Handler: chỉ việc dispatch action
  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });
  const reset = () => dispatch({ type: "RESET" });

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc" }}>
      <h2>Bộ Đếm (useReducer)</h2>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>
        Giá trị hiện tại: {state.count}
      </p>

      <Button onClick={increment} style={{ ...buttonStyle }} variant="primary">
        Tăng (+1)
      </Button>
      <Button onClick={decrement} style={{ ...buttonStyle }} variant="warning">
        Giảm (-1)
      </Button>
      <Button onClick={reset} style={{ ...buttonStyle }} variant="danger">
        Reset
      </Button>
    </div>
  );
}
