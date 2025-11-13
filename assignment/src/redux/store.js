import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expenseReducer from "./expenseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expenseReducer,
  },
});

export default store;
