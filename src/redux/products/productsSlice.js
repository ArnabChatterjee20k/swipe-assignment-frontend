import { createSlice,current } from "@reduxjs/toolkit";
import generateRandomId from "../../utils/generateRandomId";
const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      const receivedItems = action.payload.products.map((item) => ({
        itemId: generateRandomId(),
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemPrice: item.itemPrice,
        itemQuantity: item.itemQuantity,
        invoices: [action.payload.invoiceID],
      }));
      state.push(...receivedItems);
    },
    deleteProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateProducts: (state, action) => {
      const products = action.payload.items
      products.forEach(item=>{
        const index = state.findIndex(
          (product) => product.itemId === item.itemId
        );
        if (index !== -1) {
          const prevInvoices = current(state)[index].invoices
          const currentInvoices = item.invoices
          console.log({prevInvoices,currentInvoices})
          // state[index] = {...item,invoices:[...new Set(...prevInvoices,...currentInvoices)]};
          state[index] = item
        }
        else{
          state.push({
            itemId: generateRandomId(),
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
            invoices: [action.payload.invoiceID],
          })
        }
      })
    },
  },
});

export default productsSlice.reducer;

export const { addProduct, deleteProduct, updateProducts } =
  productsSlice.actions;

export const selectProducts = (state) => state.products;
