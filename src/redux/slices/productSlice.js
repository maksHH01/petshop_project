import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const PRODUCTS_URL = "http://localhost:3333/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (productsData) => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}/all`, productsData);
      return response.data;
    } catch (error) {
      console.log("error failed to get Products", error);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
