import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productsReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
  },
});

export default store;
