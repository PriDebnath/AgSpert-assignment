import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "../../utils/constants/apiUrls";
import { Login } from "./loginApi.model";

const login = createAsyncThunk(
  "auth/login",
  async function (inputValue: Login, { rejectWithValue }) {
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
      return rejectWithValue(err);
    }
  }
);

// export const login2 = createAsyncThunk(
//   'login',
//   async (values, { rejectWithValue }) => {
//     try {
//       // Assuming you have an API call here that returns a response
//       const response = await apiLogin(values);
//       if (response.ok) {
//         return response.data; // Assuming the API returns user data on successful login
//       } else {
//         return rejectWithValue(response.error); // Assuming the API returns an error message on failure
//       }
//     } catch (error) {
//       return rejectWithValue(error.message );
//     }
//   }
// );

export { login };
