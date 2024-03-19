import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curriculos: [],
};

export const curriculoSlice = createSlice({
  name: "curriculos",
  initialState,
  reducers: {
    allCurriculos: (state, action) => {
      state.curriculos = action.payload;
    },
  },
});

export const { allCurriculos } = curriculoSlice.actions;
export default curriculoSlice.reducer;
