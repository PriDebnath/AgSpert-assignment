import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/login/loginSlice";
import saleOrderSlice from "../features/sale-order/saleOrderSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    saleOrder: saleOrderSlice,
  },
});

export default store;
