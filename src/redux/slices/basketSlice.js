import { createSlice } from "@reduxjs/toolkit";

const savedItemsRaw = localStorage.getItem("basket");
const savedItems = savedItemsRaw ? JSON.parse(savedItemsRaw) : {};

const saveBasket = (items) => {
  localStorage.setItem("basket", JSON.stringify(items));
};

const calculateTotals = (items) => {
  if (!items || Object.keys(items).length === 0) {
    return { totalQuantity: 0, totalPrice: 0 };
  }

  const totalQuantity = Object.values(items).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = Object.values(items).reduce(
    (sum, item) =>
      sum +
      (item.discont_price && item.discont_price < item.price
        ? item.discont_price
        : item.price) *
        item.quantity,
    0
  );

  return { totalQuantity, totalPrice };
};

const { totalQuantity, totalPrice } = calculateTotals(savedItems);

const initialState = {
  items: savedItems,
  totalQuantity,
  totalPrice,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const id = product.id;

      if (state.items[id]) {
        state.items[id].quantity += quantity;
      } else {
        state.items[id] = { ...product, quantity };
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveBasket(state.items);
    },

    removeFromBasket: (state, action) => {
      delete state.items[action.payload];

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveBasket(state.items);
    },

    clearBasket: (state) => {
      state.items = {};
      state.totalQuantity = 0;
      state.totalPrice = 0;

      saveBasket(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity = quantity;
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveBasket(state.items);
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket, updateQuantity } =
  basketSlice.actions;

export default basketSlice.reducer;
