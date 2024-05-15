import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
