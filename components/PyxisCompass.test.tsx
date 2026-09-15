import { render, screen } from "@testing-library/react";
import { PyxisCompass } from "./PyxisCompass";

describe("PyxisCompass", () => {
  it("is announced as the Pyxis mark", () => {
    render(<PyxisCompass />);
    expect(screen.getByRole("img", { name: /pyxis/i })).toBeInTheDocument();
  });

  it("thickens its strokes at small sizes so the mark survives in the header", () => {
    const { rerender } = render(<PyxisCompass size={28} />);
    expect(screen.getByRole("img")).toHaveAttribute("data-scale", "small");

    rerender(<PyxisCompass size={96} />);
    expect(screen.getByRole("img")).toHaveAttribute("data-scale", "large");
  });
});
