import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import opitionpostSlice from "./opitionpostSlice";

import userReducer from "./features/login/loginSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    opition: opitionpostSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
