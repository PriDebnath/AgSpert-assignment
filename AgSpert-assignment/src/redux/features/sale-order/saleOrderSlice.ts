import { createSlice } from "@reduxjs/toolkit";
import API_REQUEST_STATUS from "../../utils/constants/apiRequestStatus";
const { IDLE, PENDING, SUCCEEDED, FAILED } = API_REQUEST_STATUS;
import { saleOrder } from "./saleOrderApi";

interface LoginInterface {
  data: any;
  status: string;
}

const initialState: LoginInterface = {
  data: null,
  status: IDLE || PENDING || SUCCEEDED || FAILED,
};

const saleOrderSlice = createSlice({
  name: "saleOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saleOrder.pending, (state, action) => {
      state.status = PENDING;
    });
    builder.addCase(saleOrder.fulfilled, (state, action) => {
      console.log({ state });
      state.status = SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(saleOrder.rejected, (state, action) => {
      state.status = FAILED;
    });
  },
});

export default saleOrderSlice.reducer;

export {};
