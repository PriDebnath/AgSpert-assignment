import { createSlice } from "@reduxjs/toolkit";
import API_REQUEST_STATUS from "../../utils/constants/apiRequestStatus";
const { IDLE, PENDING, SUCCEEDED, FAILED } = API_REQUEST_STATUS;
import { login } from "./loginApi";

interface LoginInterface {
  data: any;
  status: string;
}

const initialState: LoginInterface = {
  data: null,
  status: IDLE || PENDING || SUCCEEDED || FAILED,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = PENDING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = FAILED;
    });
  },
});

export default loginSlice.reducer;

export {};
