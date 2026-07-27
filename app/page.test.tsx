import { render, screen } from "@testing-library/react";
import Home from "./page";

it("renders the homepage placeholder", () => {
  render(<Home />);
  expect(screen.getByText("Pyxis")).toBeInTheDocument();
});
