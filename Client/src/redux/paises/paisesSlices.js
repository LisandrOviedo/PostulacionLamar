import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paises_activos: [],
};

export const paisesSlice = createSlice({
  name: "paises",
  initialState,
  reducers: {
    allPaisesActivos: (state, action) => {
      state.paises_activos = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allPaisesActivos, resetState } = paisesSlice.actions;
export default paisesSlice.reducer;
