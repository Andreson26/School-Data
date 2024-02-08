import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import theme from "./themeSlice";
import auth from "./authSlice";
import { userApiSlice } from "./userApiSlice";
import students from "./studentSlice";

export const store = configureStore({
  reducer: {
    theme,
    auth,
    students,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
});

setupListeners(store.dispatch);
