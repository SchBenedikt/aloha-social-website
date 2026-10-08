import { render, screen } from "@testing-library/react";
import { Container } from "@/components/ui";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Test content</Container>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Container className="custom-class">Test</Container>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

describe("Site configuration", () => {
  it("has correct site name", async () => {
    const { SITE } = await import("@/lib/site");
    expect(SITE.name).toBe("Aloha Social");
    expect(SITE.url).toBe("https://aloha.social");
  });
});