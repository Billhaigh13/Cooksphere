import { describe, test, expect } from "vitest";
import { mocks } from "../mocks";
import { sortRecipes } from "../../utils/sortRecipes";

describe("sortRecipes function tests", () => {
  test("Should sort the recipes alphebetically", () => {
    expect(sortRecipes(mocks.recipes, "A-Z")).toEqual(
      [...mocks.recipes].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  });
  test("Should sort the recipes in reverse alphebetical order", () => {
    expect(sortRecipes(mocks.recipes, "Z-A")).toEqual(
      [...mocks.recipes].sort((a, b) => (a.name < b.name ? 1 : -1))
    );
  });
  test("Should return the recipes if no sorting order is provided", () => {
    expect(sortRecipes(mocks.recipes, " ")).toEqual(mocks.recipes);
  });
});
