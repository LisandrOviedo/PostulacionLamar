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
    resetState: () => {
      return {
        curriculos: [],
        curriculo: {},
      };
    },
  },
});

export const { allCurriculos } = curriculoSlice.actions;
export default curriculoSlice.reducer;
