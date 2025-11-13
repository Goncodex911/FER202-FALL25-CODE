import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// GET /payments?userId=1
export const fetchPaymentsByUser = createAsyncThunk(
  "payments/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get("/payments", { params: { userId } });
      return res.data;
    } catch (err) {
      return rejectWithValue("Cannot load payments");
    }
  }
);

// POST /payments
export const createPayment = createAsyncThunk(
  "payments/create",
  async (payment, { rejectWithValue }) => {
    try {
      const res = await api.post("/payments", payment);
      return res.data;
    } catch (err) {
      return rejectWithValue("Create payment failed");
    }
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    list: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPaymentsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchPaymentsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createPayment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default paymentsSlice.reducer;
