import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curriculos: [],
  curriculo: {},
  curriculoEmpleado: {},
};

export const curriculoSlice = createSlice({
  name: "curriculos",
  initialState,
  reducers: {
    allCurriculos: (state, action) => {
      state.curriculos = action.payload;
    },
    createCurriculo: (state, action) => {
      state.curriculo = action.payload;
    },
    curriculoEmpleado: (state, action) => {
      state.curriculoEmpleado = action.payload;
    },
  },
});

export const { allCurriculos, createCurriculo, curriculoEmpleado } =
  curriculoSlice.actions;
export default curriculoSlice.reducer;
