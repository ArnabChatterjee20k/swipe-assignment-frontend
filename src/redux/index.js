import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoice/invoicesSlice"; // Import your other reducers
import productsReducer from "./products/productsSlice"
import groupReducer from "./groups/groupSlice"
const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer,
  group:groupReducer
});

export default rootReducer;
