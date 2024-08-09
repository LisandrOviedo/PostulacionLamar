import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  etnias_activas: [],
};

export const etniaSlice = createSlice({
  name: "etnias",
  initialState,
  reducers: {
    allEtniasActivas: (state, action) => {
      state.etnias_activas = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allEtniasActivas, resetState } = etniaSlice.actions;
export default etniaSlice.reducer;
