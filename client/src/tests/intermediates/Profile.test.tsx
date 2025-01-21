import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthContext } from "../../App";
import { mocks } from "../mocks";
import { Profile } from "../../components/intermediates/Profile";

describe("Profile component test", () => {
  test("should correctly render the profile component", () => {
    render(
      <BrowserRouter>
      <AuthContext.Provider value={mocks.currentUser}>
        <Profile />
      </AuthContext.Provider>
      </BrowserRouter>
    )
    expect(screen.getByText("My Profile")).toBeInTheDocument();
  })
})