import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/store/store";

export const initialState: {
  nileCruise: any[];
} = {
  nileCruise: [],
};

export const nileCruiseSlice = createSlice({
  name: "nileCruise",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNileCruise: (state, action: PayloadAction<any[]>) => {
      state.nileCruise = action.payload;
    },
  },
});

export const { setNileCruise } = nileCruiseSlice.actions;
// export const getThread = (state: RootState) => state.dash;

export default nileCruiseSlice.reducer;
