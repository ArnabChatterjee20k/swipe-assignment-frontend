import { createSlice } from "@reduxjs/toolkit";
import { structureProducts } from "./utils";
import generateRandomId from "../../utils/generateRandomId";
const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    
    addProduct: (state, action) => {
      console.log(action.payload)
      const receivedItems = action.payload.products.map((item) => ({
        itemId: generateRandomId(),
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemPrice: item.itemPrice,
        itemQuantity: item.itemQuantity,
        invoices: [action.payload.invoiceID],
      }));;
      state.push(...receivedItems)
    },
    deleteProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        const item = action.payload;
        state[index] = item;
      }
    },
  },
});

export default productsSlice.reducer;

export const { addProduct, deleteProduct, updateProduct } =
  productsSlice.actions;

export const selectProducts = (state) => state.products;
