import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Lấy danh sách expense theo user
export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
  async (userId) => {
    const res = await api.get("/expenses", {
      params: { userId },
    });
    return res.data;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/add",
  async (expense) => {
    const res = await api.post("/expenses", expense);
    return res.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async (expense) => {
    const res = await api.put(`/expenses/${expense.id}`, expense);
    return res.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id) => {
    await api.delete(`/expenses/${id}`);
    return id;
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    filter: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        (e) => e.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    });
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.items = state.items.filter((e) => e.id !== action.payload);
    });
  },
});

export const { setFilter } = expenseSlice.actions;
export default expenseSlice.reducer;
