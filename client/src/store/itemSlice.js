import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    lastItems: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLastItems: (state, action) => {
      state.lastItems = action.payload;
    },
  },
});

export const { setItems, setLastItems } = itemsSlice.actions;

export default itemsSlice.reducer;
