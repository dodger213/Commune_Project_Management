import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./slice/authSlice"
import { statsApi } from "./api/statsApi"
import { setupListeners } from "@reduxjs/toolkit/query"

const store1 = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(statsApi.middleware),
})

setupListeners(store1.dispatch)

export default store1;
