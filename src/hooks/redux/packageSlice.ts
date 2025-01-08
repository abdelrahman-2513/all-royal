import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/store/store";

export const initialState: {
  package: any[];
} = {
  package: [],
};

export const packageSlice = createSlice({
  name: "package",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPackage: (state, action: PayloadAction<any[]>) => {
      state.package = action.payload;
    },
  },
});

export const { setPackage } = packageSlice.actions;
// export const getThread = (state: RootState) => state.dash;

export default packageSlice.reducer;
