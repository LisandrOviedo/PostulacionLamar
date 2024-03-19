import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./curriculoSlice";

export const store = configureStore({
  reducer: { curriculos: userReducer },
});
