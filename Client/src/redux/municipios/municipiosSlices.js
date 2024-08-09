import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  municipios_activos: [],
};

export const municipiosSlice = createSlice({
  name: "municipios",
  initialState,
  reducers: {
    allMunicipiosActivos: (state, action) => {
      state.municipios_activos = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allMunicipiosActivos, resetState } = municipiosSlice.actions;
export default municipiosSlice.reducer;
