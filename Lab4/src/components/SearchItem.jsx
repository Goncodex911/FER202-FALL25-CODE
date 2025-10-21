import React, { useReducer } from "react";

const data = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Carrot", category: "Vegetable" },
  { id: 3, name: "Banana", category: "Fruit" },
  { id: 4, name: "Broccoli", category: "Vegetable" },
];

const initialState = {
  searchTerm: "",
  filtered: data,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      const term = action.value.toLowerCase();
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
      return { ...state, searchTerm: action.value, filtered };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function SearchItem_useReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        background: "#f7fafd",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#1976d2", marginBottom: 24 }}>
        Tìm kiếm theo tên (useReducer)
      </h3>

      <input
        type="text"
        value={state.searchTerm}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", value: e.target.value })
        }
        placeholder="Tìm kiếm theo tên..."
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1.5px solid #90caf9",
          marginBottom: 18,
          fontSize: 16,
        }}
      />

      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {state.filtered.length > 0 ? (
          state.filtered.map((item) => (
            <li
              key={item.id}
              style={{
                background: "#e3f2fd",
                marginBottom: 10,
                padding: "10px 14px",
                borderRadius: "7px",
              }}
            >
              <b>{item.name}</b> <span>({item.category})</span>
            </li>
          ))
        ) : (
          <li style={{ textAlign: "center", color: "#888" }}>
            Không tìm thấy kết quả
          </li>
        )}
      </ul>
    </div>
  );
}
