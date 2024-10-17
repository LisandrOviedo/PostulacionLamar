import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    allRoles: (state, action) => {
      state.roles = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { allRoles, resetState } = rolesSlice.actions;
export default rolesSlice.reducer;
