import { useSearchParams } from "react-router";
import { RecipeResults } from "./RecipeResults";
import { useEffect, useState } from "react";
import { searchRecipes } from "../../ApiClient";
import { Filter } from "./Filter";
import { filterRecipes } from "../../utils/filterRecipes";
import { sortRecipes } from "../../utils/sortRecipes";
import { SortSelect } from "./SortSelect";
import { FilterState, Recipe } from "../../types/types";

export function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    tags: [],
    time: [],
    ratings: "all",
  });
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [sorting, setSorting] = useState<string>("");

  useEffect(() => {
    searchRecipes(searchParams.get("q"))
      .then((data) => {
        setResults(data);
        setFiltered(data);
      })
      .catch((e) => console.log(e));
  }, [searchParams]);

  useEffect(() => {
    if (results.length > 0) {
      const filteredRecipes = filterRecipes(results, filter);
      const sortedRecipes = sortRecipes(filteredRecipes, sorting);
      setFiltered(sortedRecipes);
    }
  }, [filter, results, sorting]);

  return (
    <>
      <div className='flex px-4'>
        <Filter
          recipes={results}
          updateFilter={(filter) => setFilter(filter)}
        />
        <div className='w-full pt-12 pb-4'>
          <h2 className='text-2xl font-bold py-1 font-fira'>{`Search results for "${searchParams.get(
            "q"
          )}"`}</h2>
          <SortSelect setSorting={setSorting} />
          <RecipeResults
            recipes={filtered}
            message='No matching recipes found for your search. Please try a different search.'
          />
        </div>
      </div>
    </>
  );
}
