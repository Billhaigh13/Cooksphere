import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthContext } from "../../App";
import { currentUser } from "../mocks/user";
import { Upload } from "../../components/uploadpage/Upload";

describe("Upload component test", () => {
  test("Should correctly render the upload component", () => {
    render(
      <BrowserRouter>
      <AuthContext.Provider value={currentUser}>
        <Upload />
      </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Upload Recipe")).toBeInTheDocument();
  })
})