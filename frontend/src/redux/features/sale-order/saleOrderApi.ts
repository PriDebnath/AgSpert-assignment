import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constants/apiUrls";

const getProducts = createAsyncThunk(
  "products/getProducts",
  async function (sort: string, { rejectWithValue }) {
    try {
      let response = await fetch(API_URLS.products, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const addSaleOrder = createAsyncThunk(
  "saleOrder/addSaleOrder",
  async function (formData: any, { rejectWithValue }) {
    try {
      let response = await fetch(API_URLS.sale_order, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData!),
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const editSaleOrder = createAsyncThunk(
  "saleOrder/editSaleOrder",
  async function (formData: any, { rejectWithValue }) {
    console.log("edit salr");
    try {
      let response = await fetch(API_URLS.sale_order + "/" + formData.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const getSaleOrder = createAsyncThunk(
  "saleOrder/getSaleOrder",
  async function (sort: string, { rejectWithValue }) {
    try {
      let response = await fetch(API_URLS.sale_order, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export { addSaleOrder, editSaleOrder, getSaleOrder, getProducts };
