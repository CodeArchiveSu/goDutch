import { configureStore, createSlice } from "@reduxjs/toolkit";
import { loggedInUser } from "./@types/CustomTypes";
import { copyFileSync } from "fs";

const initialState: loggedInUser | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      // console.log("action.payload", action.payload);
      return action.payload;
    },
    logoutUser(state, action) {
      return null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
