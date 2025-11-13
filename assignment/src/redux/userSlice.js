import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: null, // {id, username, fullName}
  },
  reducers: {
    setUser: (state, action) => {
      state.current = action.payload;
    },
    logout: (state) => {
      state.current = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
