import { describe, it, expect } from "vitest";
import gptReducer, {
  toggleGPTSearch,
  addGptMovieResults,
} from "../utils/gptSlice";

describe("gptSlice", () => {
  it("should return initial state", () => {
    const initialState = gptReducer(undefined, { type: "unknown" });

    expect(initialState).toEqual({
      showGPTSearch: false,
      movieResults: null,
      movieNames: null,
    });
  });

  it("should toggle showGPTSearch", () => {
    const previousState = {
      showGPTSearch: false,
      movieResults: null,
      movieNames: null,
    };

    const newState = gptReducer(previousState, toggleGPTSearch());

    expect(newState.showGPTSearch).toBe(true);
  });

  it("should toggle showGPTSearch back to false", () => {
    const previousState = {
      showGPTSearch: true,
      movieResults: null,
      movieNames: null,
    };

    const newState = gptReducer(previousState, toggleGPTSearch());

    expect(newState.showGPTSearch).toBe(false);
  });

  it("should add GPT movie results", () => {
    const previousState = {
      showGPTSearch: false,
      movieResults: null,
      movieNames: null,
    };

    const payload = {
      movieNames: ["Inception", "Interstellar"],
      movieResults: [{ id: 1 }, { id: 2 }],
    };

    const newState = gptReducer(
      previousState,
      addGptMovieResults(payload)
    );

    expect(newState.movieNames).toEqual(payload.movieNames);
    expect(newState.movieResults).toEqual(payload.movieResults);
  });
});