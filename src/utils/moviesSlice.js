import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailer: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      if (!state.nowPlayingMovies) state.nowPlayingMovies = action.payload;
      else
        state.nowPlayingMovies = [...state.nowPlayingMovies, ...action.payload];
    },
    addTrailerVideo: (state, action) => {
      state.trailer = action.payload;
    },
    addPopularMovies: (state, action) => {
      if (!state.popularMovies) state.popularMovies = action.payload;
      else state.popularMovies = [...state.popularMovies, ...action.payload];
    },
    addTopRatedMovies: (state, action) => {
      if (!state.topRatedMovies) state.topRatedMovies = action.payload;
      else state.topRatedMovies = [...state.topRatedMovies, ...action.payload];
    },
    addUpcomingMovies: (state, action) => {
      if (!state.upcomingMovies) state.upcomingMovies = action.payload;
      else state.upcomingMovies = [...state.upcomingMovies, ...action.payload];
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
