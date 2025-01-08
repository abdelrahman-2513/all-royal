import { configureStore } from "@reduxjs/toolkit/react";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { emptySplitApi } from "./emptyApi";
import dashboardSlice from "@/hooks/redux/dashboardSlice";
import packageSlice from "@/hooks/redux/packageSlice";
import nileCruiseSlice from "@/hooks/redux/cruiseSlice";
import homeSlice from "@/hooks/redux/homeSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    package: packageSlice,
    nileCruise: nileCruiseSlice,
    home: homeSlice,
    // [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(emptySplitApi.middleware),
});
// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
