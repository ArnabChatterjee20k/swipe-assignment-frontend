import { createSlice } from "@reduxjs/toolkit";

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
  },
});
export const { addGroup } = groupSlice.actions;
export const selectGroup = (state) => state.group;
export default groupSlice.reducer;
