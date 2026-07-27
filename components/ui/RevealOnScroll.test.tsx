import { render, screen } from "@testing-library/react";
import { RevealOnScroll } from "./RevealOnScroll";

describe("RevealOnScroll", () => {
  it("renders its children", () => {
    render(
      <RevealOnScroll>
        <p>Hello</p>
      </RevealOnScroll>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("still renders its children when reduced motion is preferred", () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;

    render(
      <RevealOnScroll>
        <p>Reduced</p>
      </RevealOnScroll>
    );
    expect(screen.getByText("Reduced")).toBeInTheDocument();
  });
});
