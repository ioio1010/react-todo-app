import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./index";

export const store = configureStore({
  reducer: rootReducer,
  // TODO: Not serializable check in redux store
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
