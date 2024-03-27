import { configureStore } from "@reduxjs/toolkit";
import cart from "./slice/cart";

const store = configureStore({
  reducer: {
    cart,
  },
});

export default store;
