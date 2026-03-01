import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockDispatch = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("../components/MovieCard", () => ({
  default: ({ title }) => <div>{title}</div>,
}));

vi.mock("../../utils/constants", () => ({
  API_OPTIONS: {},
}));

vi.mock("../../utils/moviesSlice", () => ({
  addPopularMovies: vi.fn((payload) => ({
    type: "addPopularMovies",
    payload,
  })),
  addNowPlayingMovies: vi.fn((payload) => ({
    type: "addNowPlayingMovies",
    payload,
  })),
  addUpcomingMovies: vi.fn((payload) => ({
    type: "addUpcomingMovies",
    payload,
  })),
  addTopRatedMovies: vi.fn((payload) => ({
    type: "addTopRatedMovies",
    payload,
  })),
}));

import MovieList from "../components/MovieList";

describe("MovieList Component (Basic)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockMovies = [
    { id: 1, poster_path: "/img1.jpg", original_title: "Movie 1" },
    { id: 2, poster_path: "/img2.jpg", original_title: "Movie 2" },
  ];

  it("renders nothing if movies is null", () => {
    const { container } = render(<MovieList title="Popular" movies={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders title correctly", () => {
    render(<MovieList title="Popular" movies={mockMovies} />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  it("renders movie cards", () => {
    render(<MovieList title="Popular" movies={mockMovies} />);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

});
