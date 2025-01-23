import { describe, test, expect, vi } from "vitest";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { AuthContext } from "../../App";
import { mocks } from "../mocks/index";
import { GeneralCard } from "../../components/recipedetailspage/GeneralCard";
import { updateFavorites } from "../../ApiClient";

vi.mock("../../ApiClient", () => ({
  updateFavorites: vi.fn(),
}));

describe("GeneralCard component test", () => {
  test("Should correctly render the GeneralCard component", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mocks.currentUser}>
          <GeneralCard recipe={mocks.recipe} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(mocks.recipe.name)).toBeInTheDocument();

    expect(screen.getByText(mocks.recipe.category)).toBeInTheDocument();

    expect(screen.getByText("45min")).toBeInTheDocument();

    expect(screen.getByTestId("recipe_img")).toHaveAttribute(
      "src",
      mocks.recipe.image
    );
  });
  test("Should add to favorites if not a favorite recipe", async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mocks.currentUser}>
          <GeneralCard recipe={mocks.recipe} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Add to favorites")).toBeInTheDocument();
    const favButton = screen.getByTestId("favButton");
    fireEvent.click(favButton);
    await waitFor(() => {
      expect(updateFavorites).toHaveBeenCalledWith(
        mocks.currentUser,
        mocks.recipe,
        true
      );
    });
    expect(favButton).toHaveTextContent("Remove from favorites");
    fireEvent.click(favButton);
    await waitFor(() => {
      expect(updateFavorites).toHaveBeenCalledWith(
        mocks.currentUser,
        mocks.recipe,
        false
      );
    });
    expect(favButton).toHaveTextContent("Add to favorites");
  });
});
