import { createSlice } from "@reduxjs/toolkit";

const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    categories: [
      "Chronological collection",
      "General collection",
      "Documentary collection",
      "Research collection",
      "Thematic collection",
      "Postal history collection",
      "Airmail collection",
      "Postmark collection",
      "Specialized collection",
      "Other",
    ],
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
