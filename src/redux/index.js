import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoice/invoicesSlice"; // Import your other reducers
import productsReducer from "./products/productsSlice"
const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer
});

export default rootReducer;
