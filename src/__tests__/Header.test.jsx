import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../components/Header";


const mockNavigate = vi.fn();
const mockDispatch = vi.fn();


vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));


vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn(),
}));


vi.mock("../utils/firebase", () => ({
  auth: {},
}));

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null); 
    return vi.fn();
  }),
  signOut: vi.fn(async () => {}),
}));


vi.mock("../../utils/constants", () => ({
  LOGO_URL: "test-logo.png",
  SUPPORTED_LANGUAGES: [
    { identifier: "en", name: "English" },
    { identifier: "es", name: "Spanish" },
  ],
}));


vi.mock("../../utils/userSlice", () => ({
  addUser: vi.fn((payload) => ({ type: "addUser", payload })),
  removeUser: vi.fn(() => ({ type: "removeUser" })),
}));

vi.mock("../../utils/gptSlice", () => ({
  toggleGPTSearch: vi.fn(() => ({ type: "toggleGPTSearch" })),
}));

vi.mock("../../utils/configSlice", () => ({
  changeLanguage: vi.fn((payload) => ({
    type: "changeLanguage",
    payload,
  })),
}));

import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders logo always", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: null,
        gpt: { showGPTSearch: false },
      })
    );

    render(<Header />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("shows buttons when user exists", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: { uid: "123" },
        gpt: { showGPTSearch: false },
      })
    );

    render(<Header />);
    expect(screen.getByText("🔍 GPT Search")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("toggles GPT search when button clicked", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: { uid: "123" },
        gpt: { showGPTSearch: false },
      })
    );

    render(<Header />);
    fireEvent.click(screen.getByText("🔍 GPT Search"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("shows language dropdown when showGPTSearch is true", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: { uid: "123" },
        gpt: { showGPTSearch: true },
      })
    );

    render(<Header />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("dispatches changeLanguage on dropdown change", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: { uid: "123" },
        gpt: { showGPTSearch: true },
      })
    );

    render(<Header />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "es" },
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("signs out when Sign Out clicked", async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: { uid: "123" },
        gpt: { showGPTSearch: false },
      })
    );

    render(<Header />);
    fireEvent.click(screen.getByText("Sign Out"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("calls onAuthStateChanged on mount", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: null,
        gpt: { showGPTSearch: false },
      })
    );

    render(<Header />);
    expect(onAuthStateChanged).toHaveBeenCalled();
  });
});