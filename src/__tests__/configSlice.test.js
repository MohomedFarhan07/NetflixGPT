import { describe, it, expect } from "vitest";
import configReducer, { changeLanguage } from "../utils/configSlice";

describe("configSlice", () => {
  it("should return initial state", () => {
    const initialState = configReducer(undefined, { type: "unknown"});

    expect(initialState).toEqual({
      lang: "en",
    });
    
  });

  it("should handle changeLanguage", () => {

    const previousState = {lang: "en"};

    const newState = configReducer(
      previousState,
      changeLanguage("es")
    );

    expect(newState.lang).toBe("es");
  });
});