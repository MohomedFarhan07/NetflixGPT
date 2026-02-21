import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import TestButton from "../components/TestButton";

describe("TestButton component", () => {
  test("renders with correct label", () => {
    render(<TestButton label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const handleClick = vi.fn(); 
    render(<TestButton label="Click Me" onClick={handleClick} />);
    
    await userEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
