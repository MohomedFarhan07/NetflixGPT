import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesSlice from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import searchReducer from "./searchSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesSlice,
    gpt: gptReducer,
    config: configReducer,
    search: searchReducer,
  },
});

export default appStore;
