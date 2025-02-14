import { configureStore } from "@reduxjs/toolkit";
import booksApi from "./endpoints/booksApi";
import { authApi } from "./endpoints/authApi";
import { requestsApi } from "./endpoints/requestsApi";

export const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [requestsApi.reducerPath]: requestsApi.reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(booksApi.middleware)
          .concat(authApi.middleware)
          .concat(requestsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch