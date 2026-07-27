import { readFileSync } from "fs";
import path from "path";

describe("design tokens", () => {
  it("defines the Pyxis color palette and reduced-motion rule in globals.css", () => {
    const css = readFileSync(
      path.join(process.cwd(), "app/globals.css"),
      "utf-8"
    );
    expect(css).toContain("--color-pyxis-bg: #050505");
    expect(css).toContain("--color-pyxis-fg: #f2f1ee");
    expect(css).toContain("--color-pyxis-accent: #d9a54d");
    expect(css).toContain("--color-pyxis-panel: #12141a");
    expect(css).toContain("prefers-reduced-motion");
  });
});
