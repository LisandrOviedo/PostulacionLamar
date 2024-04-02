import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curriculos: [],
  curriculo: {},
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
  },
});

export const { allCurriculos, createCurriculo } = curriculoSlice.actions;
export default curriculoSlice.reducer;
