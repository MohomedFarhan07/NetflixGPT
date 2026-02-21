import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cachedResults: (state, action) => {
      const { searchQuery, results } = action.payload;
      state[searchQuery] = results;
      return state;
    },
  },
});

export const { cachedResults } = searchSlice.actions;

export default searchSlice.reducer;
