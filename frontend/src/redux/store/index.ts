import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/login/loginSlice";
import { pr, sr } from "../features/sale-order/saleOrderSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    saleOrder: sr,
    product: pr,
  },
});

export default store;
