import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// GET /users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err) {
      return rejectWithValue("Cannot load users");
    }
  }
);

// Cập nhật status (blocked / active)
export const toggleUserStatus = createAsyncThunk(
  "users/toggleStatus",
  async (user, { rejectWithValue }) => {
    try {
      const updated = { ...user, status: user.status === "active" ? "blocked" : "active" };
      const res = await api.put(`/users/${user.id}`, updated);
      return res.data;
    } catch (err) {
      return rejectWithValue("Update failed");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // toggle status
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const idx = state.list.findIndex(u => u.id === action.payload.id);
        state.list[idx] = action.payload;
      });
  }
});

export default usersSlice.reducer;
