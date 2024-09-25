import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clases_movimientos_activas: [],
};

export const clasesMovimientosSlice = createSlice({
  name: "clases_movimientos",
  initialState,
  reducers: {
    allClasesMovimientosActivas: (state, action) => {
      state.clases_movimientos_activas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allClasesMovimientosActivas, resetState } =
  clasesMovimientosSlice.actions;
export default clasesMovimientosSlice.reducer;
