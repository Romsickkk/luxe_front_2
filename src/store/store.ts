// store.js
import { authApi } from "../authentication/apiAuth";
import { apiArtists } from "../features/artists/apiArtists";
import { apiReleases } from "../features/releases/apiReleases";
import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./uiSlice";
import authReducer from "../authentication/authSlice";
import darkModeReducer from "./darkModeSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    ui: uiReducer,

    [authApi.reducerPath]: authApi.reducer,
    [apiArtists.reducerPath]: apiArtists.reducer,
    [apiReleases.reducerPath]: apiReleases.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(apiArtists.middleware).concat(apiReleases.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
