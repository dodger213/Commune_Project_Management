import { createSlice } from "@reduxjs/toolkit"

const authInitial = {
  isAuthenticated: false,
}

const initialState = {
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true
    },
  },
})

export const { setIsAuthenticated } = authSlice.actions
