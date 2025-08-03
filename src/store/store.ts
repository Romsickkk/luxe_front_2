// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/apiAuth";
import { apiArtists } from "../features/artists/apiArtists";
import { apiArtistAvatar } from "../services/apiArtistAvatar";
import { apiReleases } from "../features/releases/apiReleases";
import darkModeReducer from "./darkModeSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,

    [authApi.reducerPath]: authApi.reducer,
    [apiArtists.reducerPath]: apiArtists.reducer,
    [apiReleases.reducerPath]: apiReleases.reducer,
    [apiArtistAvatar.reducerPath]: apiArtistAvatar.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(apiArtists.middleware)
      .concat(apiReleases.middleware)
      .concat(apiArtistAvatar.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
