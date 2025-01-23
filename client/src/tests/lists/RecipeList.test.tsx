import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthContext } from "../../App";
import { mocks } from "../mocks";
import { RecipeList } from "../../components/lists/RecipeList";

describe("RecipeList component test", () => {
  test("Should correctly render the RecipeList component", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mocks.currentUser}>
          <RecipeList title={"New Added Recipes"} recipes={mocks.recipes} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("New Added Recipes")).toBeInTheDocument();
  });
});
