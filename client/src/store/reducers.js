import { combineReducers } from "@reduxjs/toolkit";
import collectionsReducer from "./collectionsSlice";

const rootReducer = combineReducers({
  collections: collectionsReducer,
});

export default rootReducer;
