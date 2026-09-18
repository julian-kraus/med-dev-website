import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CookieNotice } from "../components/layout/CookieNotice";

function renderNotice() {
  return render(
    <MemoryRouter>
      <CookieNotice />
    </MemoryRouter>,
  );
}

afterEach(() => {
  // Auto-cleanup only registers when Vitest globals are on, and they are not.
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe("CookieNotice", () => {
  it("shows when nothing has been stored", async () => {
    renderNotice();
    expect(await screen.findByLabelText("Privacy notice")).toBeDefined();
  });

  it("stays hidden once accepted", () => {
    window.localStorage.setItem("med-dev-cookie-notice", "accepted");
    renderNotice();
    expect(screen.queryByLabelText("Privacy notice")).toBeNull();
  });

  it("still renders when localStorage access throws", async () => {
    // Blocked site data throws on access rather than returning null. Before
    // the guard this propagated out of the effect and blanked the page.
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("The operation is insecure.", "SecurityError");
    });

    expect(() => renderNotice()).not.toThrow();
    expect(await screen.findByLabelText("Privacy notice")).toBeDefined();
  });
});
