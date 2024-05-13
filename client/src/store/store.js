import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import logger from "redux-logger";
import rootReducer from "./reducers";

enableMapSet();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
