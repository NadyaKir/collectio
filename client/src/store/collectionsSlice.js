import { createSlice } from "@reduxjs/toolkit";

const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    categories: ["Books", "Signs", "Silverware", "Other"],
    collections: [],
    editingCollections: [],
  },
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
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

export const { setCollections, toggleEdit } = collectionsSlice.actions;

export default collectionsSlice.reducer;
