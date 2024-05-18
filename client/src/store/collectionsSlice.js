import { createSlice } from "@reduxjs/toolkit";

const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    categories: ["Books", "Signs", "Silverware", "Other"],
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
    toggleEdit: (state, action) => {
      const { payload: cardId } = action;
      const index = state.editingCollections.indexOf(cardId);
      if (index !== -1) {
        state.editingCollections.splice(index, 1);
      } else {
        state.editingCollections.push(cardId);
      }
    },
  },
});

export const { setCollections, setTopCollections, toggleEdit } =
  collectionsSlice.actions;

export default collectionsSlice.reducer;
