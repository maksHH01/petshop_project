import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = "http://localhost:3333/categories";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (categoryData) => {
    try {
      const response = await axios.get(`${BASE_URL}/all`, categoryData);
      return response.data;
    } catch (error) {
      console.log("error failed to get Categories", error);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
