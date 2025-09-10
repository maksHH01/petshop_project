import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productsReducer from "./slices/productSlice";
import basketReducer from "./slices/basketSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
    basket: basketReducer,
  },
});

export default store;
