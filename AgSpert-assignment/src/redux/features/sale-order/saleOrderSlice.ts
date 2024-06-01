import { createSlice } from "@reduxjs/toolkit";
import API_REQUEST_STATUS from "../../utils/constants/apiRequestStatus";
const { IDLE, PENDING, SUCCEEDED, FAILED } = API_REQUEST_STATUS;
import {
  addSaleOrder,
  editSaleOrder,
  getSaleOrder,
  getProducts,
} from "./saleOrderApi";

const initialState: any = {
  data: null,
  status: IDLE || PENDING || SUCCEEDED || FAILED,
};

const saleOrderSlice = createSlice({
  name: "saleOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSaleOrder.pending, (state, action) => {
      state.status = PENDING;
    });
    builder.addCase(getSaleOrder.fulfilled, (state, action) => {
      state.status = SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(getSaleOrder.rejected, (state, action) => {
      state.status = FAILED;
    });
    //
    builder.addCase(addSaleOrder.pending, (state, action) => {
      state.status = PENDING;
    });
    builder.addCase(addSaleOrder.fulfilled, (state, action) => {
      state.status = SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(addSaleOrder.rejected, (state, action) => {
      state.status = FAILED;
    });
    //
    builder.addCase(editSaleOrder.pending, (state, action) => {
      console.log("in slice edit");
      state.status = PENDING;
    });
    builder.addCase(editSaleOrder.fulfilled, (state, action) => {
      state.status = SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(editSaleOrder.rejected, (state, action) => {
      state.status = FAILED;
    });
    //
  },
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.status = PENDING;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = FAILED;
    });
  },
});
let sr = saleOrderSlice.reducer;
let pr = productSlice.reducer;
export { sr, pr };
