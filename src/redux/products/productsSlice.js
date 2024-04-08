import { createSlice, current } from "@reduxjs/toolkit";
import generateRandomId from "../../utils/generateRandomId";
const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      // concatnating current invoiceID to the items if they exists already
      // another way is their which will be more of hack is that to check if invoices is coming with the items that means it is already present in the items. But it would loosely the validations
      const addedItemIDs = [];
      action.payload.products.forEach((cur) => {
        const idx = state.findIndex((prev) => prev.itemId === cur.itemId);
        if (idx !== -1) {
          addedItemIDs.push(cur.itemId);
          const previousProductState = current(state)[idx];
          state[idx] = {
            ...previousProductState,
            invoices: [
              ...previousProductState["invoices"],
              action.payload.invoiceID,
            ],
          };
        }
      });
      const receivedItems = action.payload.products
        .map((item) => {
          if (!addedItemIDs.includes(item.itemId))
            return {
              itemId: generateRandomId(),
              itemName: item.itemName,
              itemDescription: item.itemDescription,
              itemPrice: item.itemPrice,
              itemQuantity: item.itemQuantity,
              invoices: [action.payload.invoiceID],
            };
          return null;
        })
        .filter((item) => item !== null);
      console.log({ receivedItems });
      state.push(...receivedItems);
    },
    deleteProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateProducts: (state, action) => {
      const products = action.payload.items;
      products.forEach((item) => {
        const index = state.findIndex(
          (product) => product.itemId === item.itemId
        );
        if (index !== -1) {
          const prevInvoices = current(state)[index].invoices;
          const currentInvoices = item.invoices;
          console.log({ prevInvoices, currentInvoices });
          // state[index] = {...item,invoices:[...new Set(...prevInvoices,...currentInvoices)]};
          state[index] = item;
        } else {
          state.push({
            itemId: generateRandomId(),
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
            invoices: [action.payload.invoiceID],
          });
        }
      });
    },
    deleteInvoicesFromProduct: (state, action) => {
      const { itemsIds, invoiceId } = action.payload;
      return state
        .map((item) => {
          if (itemsIds.includes(item.itemId)) {
            const updatedInvoices = item.invoices.filter(
              (invoice) => parseInt(invoice) !== invoiceId
            );
            return { ...item, invoices: updatedInvoices };
          }
          return item;
        })
        .filter((item) => item.invoices.length > 0);
    },
  },
});

export default productsSlice.reducer;

export const {
  addProduct,
  deleteProduct,
  updateProducts,
  deleteInvoicesFromProduct,
} = productsSlice.actions;

export const selectProducts = (state) => state.products;
