import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthContext } from "../../App";
import { Upload } from "../../components/uploadpage/Upload";
import { mocks } from "../mocks/index";

describe("Upload component test", () => {
  test("Should correctly render the upload component", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mocks.currentUser}>
          <Upload />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Upload Recipe")).toBeInTheDocument();
  });
});
