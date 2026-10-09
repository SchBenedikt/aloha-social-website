import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProgressChecklist } from "@/components/progress-checklist";

const steps = [
  { label: "Check versions", href: "/install#requirements" },
  { label: "Enable the app", href: "/install#enable" },
] as const;

describe("ProgressChecklist", () => {
  let saved: Map<string, string>;

  beforeEach(() => {
    saved = new Map();
    vi.mocked(window.localStorage.getItem).mockReset().mockImplementation((key) => saved.get(key) ?? null);
    vi.mocked(window.localStorage.setItem).mockReset().mockImplementation((key, value) => { saved.set(key, value); });
    vi.mocked(window.localStorage.removeItem).mockReset().mockImplementation((key) => { saved.delete(key); });
  });

  it("saves checked steps in local storage", async () => {
    render(
      <ProgressChecklist id="installation" title="Installation" steps={steps} />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await waitFor(() => expect(checkboxes[0]).toBeEnabled());
    fireEvent.click(checkboxes[0]);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "aloha-social-guide:installation",
      "[0]",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
  });

  it("restores saved steps and clears them on reset", async () => {
    saved.set("aloha-social-guide:installation", "[1]");
    render(
      <ProgressChecklist id="installation" title="Installation" steps={steps} />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await waitFor(() => expect(checkboxes[1]).toBeChecked());
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(checkboxes[1]).not.toBeChecked();
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(
      "aloha-social-guide:installation",
    );
  });
});
