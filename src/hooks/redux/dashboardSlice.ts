import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/store/store";

export const initialState: {
  active: string;
} = {
  active: "edit package",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = dashboardSlice.actions;
// export const getThread = (state: RootState) => state.dash;

export default dashboardSlice.reducer;
