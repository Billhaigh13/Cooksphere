import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "../components/Navbar";
import { AuthContext } from "../App";
import { BrowserRouter } from "react-router";
import { mocks } from "./mocks";

describe("Navbar Test", () => {
  test("Should correctly render the navbar", () => {
    render(
      <BrowserRouter>
      <AuthContext.Provider value={mocks.currentUser}>
        <Navbar />
      </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Cooksphere")).toBeInTheDocument();
    const navbarimg = screen.getByTestId("navbar_img");
    expect(navbarimg.alt).toBe("Cooksphere Logo");
    expect(navbarimg.src).toBe("http://localhost:3000/logo.png");
  });
});
