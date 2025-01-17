import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthContext } from "../../App";
import { GeneralCard } from "../../components/recipedetailspage/GeneralCard";
import { mocks } from "../mocks";

describe("GeneralCard component test", () => {
  test("Should correctly render the GeneralCard component", () => {
    render(
      <BrowserRouter>
      <AuthContext.Provider value={mocks.currentUser}>
        <GeneralCard recipe={mocks.recipe} />
      </AuthContext.Provider>
      </BrowserRouter>
    )
    expect(screen.getByTestId("recipe_img").alt).toBe("recipe image")
  })
})