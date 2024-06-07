import { createSlice } from "@reduxjs/toolkit";

const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    collections: [],
    editingCollections: [],
    topCollections: [],
  },
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    setTopCollections: (state, action) => {
      state.topCollections = action.payload;
    },
  },
});

export const { setCollections, setTopCollections } = collectionsSlice.actions;

export default collectionsSlice.reducer;
