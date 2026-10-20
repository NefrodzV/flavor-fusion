import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("h1 component", () => {
  it("renders correct heading", () => {
    render(<h1> Our first test </h1>);
    // using regex with the i flag allows simpler case-insensitive comparison
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
  });
});
