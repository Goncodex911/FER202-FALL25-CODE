import React, { useReducer } from "react";
import Button from "react-bootstrap/Button";

// 1) State ban đầu
const initialState = { isLightOn: false };

// 2) Reducer
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      // Đảo boolean dựa trên state hiện tại
      return { ...state, isLightOn: !state.isLightOn };
    case "TURN_ON":
      return { ...state, isLightOn: true };
    case "TURN_OFF":
      return { ...state, isLightOn: false };
    default:
      return state;
  }
}

export default function LightSwitch_useReducer() {
  // 3) Khởi tạo reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 4) Handlers
  const toggle = () => dispatch({ type: "TOGGLE" });
  const turnOn = () => dispatch({ type: "TURN_ON" });
  const turnOff = () => dispatch({ type: "TURN_OFF" });

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const isOn = state.isLightOn;

  return (
    <div style={{ padding: 20, border: "1px solid #ccc" }}>
      <h2>Công Tắc Đèn (useReducer)</h2>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>
        Đèn hiện đang: {isOn ? "Bật" : "Tắt"}
      </p>

      <Button
        onClick={toggle}
        style={buttonStyle}
        // đổi màu theo trạng thái (chỉ là UI)
        variant={isOn ? "danger" : "success"}
      >
        {isOn ? "Tắt đèn" : "Bật đèn"}
      </Button>

      {/* Thêm 2 nút chuyên biệt nếu muốn điều khiển trực tiếp */}
      <div style={{ marginTop: 10 }}>
        <Button onClick={turnOn} style={buttonStyle} variant="success">
          Turn ON
        </Button>
        <Button onClick={turnOff} style={buttonStyle} variant="secondary">
          Turn OFF
        </Button>
      </div>
    </div>
  );
}
