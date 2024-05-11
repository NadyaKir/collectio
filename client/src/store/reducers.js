import { combineReducers } from "@reduxjs/toolkit";
import collectionsReducer from "./collectionsSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  collections: collectionsReducer,
  auth: authReducer,
});

export default rootReducer;
