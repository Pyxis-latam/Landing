import { render, screen } from "@testing-library/react";
import { ParticleField } from "./ParticleField";

describe("ParticleField", () => {
  it("renders a canvas element", () => {
    render(<ParticleField />);
    expect(screen.getByTestId("particle-field")).toBeInTheDocument();
  });

  it("does not schedule further frames when reduced motion is preferred", () => {
    const rafSpy = jest.spyOn(window, "requestAnimationFrame");
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;

    render(<ParticleField />);
    expect(rafSpy).not.toHaveBeenCalled();
    rafSpy.mockRestore();
  });
});
