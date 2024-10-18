"use client";

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import chatReducer from "./chatSlice";
import userReducer from "./userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      chat: chatReducer,
      user: userReducer
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
