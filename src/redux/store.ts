import { configureStore } from "@reduxjs/toolkit";

import { githubApi } from "./services/github";
import { setupListeners } from "@reduxjs/toolkit/query";

import githubReducer from "./features/githubSlice";

export const store = configureStore({
  reducer: {
    githubFav: githubReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
