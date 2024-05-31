import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constants/apiUrls";

const saleOrder = createAsyncThunk(
  "saleOrder",
  async function (sort: string, { rejectWithValue }) {
    try {
      let response = await fetch(API_URLS.sale_order, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log({ data });

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export { saleOrder };
