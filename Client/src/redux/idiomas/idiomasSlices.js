import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idiomas_activos: [],
};

export const idiomasSlice = createSlice({
  name: "idiomas",
  initialState,
  reducers: {
    allIdiomasActivos: (state, action) => {
      state.idiomas_activos = action.payload;
    },
  },
});

export const { allIdiomasActivos } = idiomasSlice.actions;
export default idiomasSlice.reducer;
