import { combineReducers } from "@reduxjs/toolkit";
import collectionsReducer from "./collectionsSlice";
import authReducer from "./authSlice";
import itemReducer from "./itemSlice";

const rootReducer = combineReducers({
  collections: collectionsReducer,
  auth: authReducer,
  items: itemReducer,
});

export default rootReducer;
