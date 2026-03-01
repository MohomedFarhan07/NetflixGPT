import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../utils/constants", () => ({
  API_OPTIONS: { method: "GET" },
}));

import useSearchMovieTMDB from "../hooks/useSearchMovieTMDB";

describe("useSearchMovieTMDB", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls fetch with correct URL and API_OPTIONS", async () => {
    global.fetch = vi.fn(async () => ({
      json: async () => ({
        results: [{ id: 1, title: "Inception" }],
      }),
    }));

    const results = await useSearchMovieTMDB("Inception");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/search/movie?query=Inception&include_adult=false&language=en-US&page=1",
      { method: "GET" },
    );

    expect(results).toEqual([{ id: 1, title: "Inception" }]);
  });

  it("returns empty array when no results", async () => {
    global.fetch = vi.fn(async () => ({
      json: async () => ({
        results: [],
      }),
    }));

    const results = await useSearchMovieTMDB("UnknownMovie");

    expect(results).toEqual([]);
  });
});
