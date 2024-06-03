import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areas_interes_activas: [],
};

export const areaInteresSlice = createSlice({
  name: "areas_interes",
  initialState,
  reducers: {
    allAreasInteresActivas: (state, action) => {
      state.areas_interes_activas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allAreasInteresActivas, resetState } = areaInteresSlice.actions;
export default areaInteresSlice.reducer;
