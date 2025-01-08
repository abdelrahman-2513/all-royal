import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
  active: string;
} = {
  active: "",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = homeSlice.actions;

export default homeSlice.reducer;
