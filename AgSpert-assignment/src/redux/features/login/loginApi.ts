import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constants/apiUrls";
import { Login } from "./loginApi.model";

const login = createAsyncThunk(
  "auth/login",
  async function (inputValue: Login) {
    try {
      let response = await fetch(API_URLS.login, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });
      let data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
);

export { login };
