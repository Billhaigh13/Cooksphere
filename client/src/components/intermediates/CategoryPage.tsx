import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getRecipes } from "../../ApiClient";
import { RecipeResults } from "./RecipeResults";
import { Filter } from "./Filter";
import { SortSelect } from "./SortSelect";
import { filterRecipes } from "../../utils/filterRecipes";
import { sortRecipes } from "../../utils/sortRecipes";
import { categories } from "../../utils/imagePaths";
import { FilterState, Recipe } from "../../types/types";

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  if (!category) {
    return <p>Category not found</p>;
  }

  const url = `https://res.cloudinary.com/drm5qsq0p/image/upload/v1736524856/${
    categories[category as keyof typeof categories]
  }.jpg`;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    tags: [],
    time: [],
    ratings: "all",
  });
  const [sorting, setSorting] = useState<string>("");

  useEffect(() => {
    if (category) {
      getRecipes(category)
        .then((data) => {
          setRecipes(data);
          setFiltered(data);
        })
        .catch((e) => console.log(e));
    }
  }, [category]);

  useEffect(() => {
    if (recipes.length > 0) {
      const filteredRecipes = filterRecipes(recipes, filter);
      const sortedRecipes = sortRecipes(filteredRecipes, sorting);
      setFiltered(sortedRecipes);
    }
  }, [filter, recipes, sorting]);

  return (
    <>
      <div className='flex pl-4'>
        <Filter
          recipes={recipes}
          updateFilter={(newFilterState: FilterState) =>
            setFilter(newFilterState)
          }
        />

        <div className='w-3/4'>
          <div className='h-80 w-full relative'>
            <div
              className='h-80 bg-cover bg-[50%_45%] bg-no-repeat opacity-75'
              style={{ backgroundImage: `url(${url})` }}
            ></div>
            <h3
              className='absolute top-12 left-4 text-5xl font-bold font-fira'
              data-testid='category_heading'
            >
              {category + " Recipes"}
            </h3>
          </div>
          <div className='px-2 py-4'>
            <SortSelect setSorting={setSorting} />
            <RecipeResults
              recipes={filtered}
              message='No results matching the filter selection.'
            />
          </div>
        </div>
      </div>
    </>
  );
}
