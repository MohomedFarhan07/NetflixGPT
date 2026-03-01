import { describe, it, expect } from "vitest";
import moviesReducer, {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/moviesSlice";

describe("moviesSlice reducers test cases", () => {
  const initialState = {
    nowPlayingMovies: null,
    trailer: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
  };

  it("should handle addNowPlayingMovies", () => {
    const payload1 = [{ id: 1, title: "Movie 1" }];
    let state = moviesReducer(initialState, addNowPlayingMovies(payload1));
    expect(state.nowPlayingMovies).toEqual(payload1);

    const payload2 = [{ id: 2, title: "Movie 2" }];
    state = moviesReducer(state, addNowPlayingMovies(payload2));
    expect(state.nowPlayingMovies).toEqual([...payload1, ...payload2]);
  });

  it("should handle addTrailerVideo", () => {
    const trailerPayload = { id: "abc", url: "https://youtube.com/trailer" };
    const state = moviesReducer(initialState, addTrailerVideo(trailerPayload));
    expect(state.trailer).toEqual(trailerPayload);
  });

  it("should handle addPopularMovies", () => {
    const payload1 = [{ id: 1, title: "Popular 1" }];
    let state = moviesReducer(initialState, addPopularMovies(payload1));
    expect(state.popularMovies).toEqual(payload1);

    const payload2 = [{ id: 2, title: "Popular 2" }];
    state = moviesReducer(state, addPopularMovies(payload2));
    expect(state.popularMovies).toEqual([...payload1, ...payload2]);
  });

  it("should handle addTopRatedMovies", () => {
    const payload1 = [{ id: 1, title: "Top 1" }];
    let state = moviesReducer(initialState, addTopRatedMovies(payload1));
    expect(state.topRatedMovies).toEqual(payload1);

    const payload2 = [{ id: 2, title: "Top 2" }];
    state = moviesReducer(state, addTopRatedMovies(payload2));
    expect(state.topRatedMovies).toEqual([...payload1, ...payload2]);
  });

  it("should handle addUpcomingMovies", () => {
    const payload1 = [{ id: 1, title: "Upcoming 1" }];
    let state = moviesReducer(initialState, addUpcomingMovies(payload1));
    expect(state.upcomingMovies).toEqual(payload1);

    const payload2 = [{ id: 2, title: "Upcoming 2" }];
    state = moviesReducer(state, addUpcomingMovies(payload2));
    expect(state.upcomingMovies).toEqual([...payload1, ...payload2]);
  });
});