import { createSlice,current } from "@reduxjs/toolkit";

/** structure will look like this
 * {invoiceID:{ groups:{"GroupName":[...pdtId]} }}
 * */
const groupSlice = createSlice({
  name: "group",
  initialState: {},
  reducers: {
    addGroup: (state, action) => {
      const {invoiceID,groupsWithProducts} = action.payload
      state[invoiceID] = groupsWithProducts
    },
    removeGroupByInvoiceID:(state,action)=>{
      const currentState = current(state)
      const { [action.payload]: deletedProperty, ...newState } = currentState;
      return newState
    }
  },
});
export const { addGroup,removeGroupByInvoiceID } = groupSlice.actions;
export const selectGroup = (state) => state.group;
export default groupSlice.reducer;
