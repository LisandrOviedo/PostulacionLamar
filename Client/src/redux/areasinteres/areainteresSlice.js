import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areas_interes: [],
};

export const areaInteresSlice = createSlice({
  name: "areas_interes",
  initialState,
  reducers: {
    allAreasInteres: (state, action) => {
      state.areas_interes = action.payload;
    },
  },
});

export const { allAreasInteres } = areaInteresSlice.actions;
export default areaInteresSlice.reducer;
