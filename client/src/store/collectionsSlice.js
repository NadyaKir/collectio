import { createSlice } from "@reduxjs/toolkit";

export const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    isEditing: false,
  },
  reducers: {
    setIsEditing: (state, _) => {
      state.isEditing = !state.isEditing;
    },
  },
});

export const { setIsEditing } = collectionsSlice.actions;

export default collectionsSlice.reducer;
