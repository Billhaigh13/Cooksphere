import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { getCategories, getLatestRecipes, login } from './ApiClient';
import { CategoryList } from './components/lists/CategoryList';
import { Hero } from './components/lists/Hero';
import { Navbar } from './components/Navbar';
import { CategoryPage } from './components/intermediates/CategoryPage';
import { RecipeDetailsPage } from './components/recipedetailspage/RecipeDetailsPage';
import { RecipeList } from './components/lists/RecipeList';
import { Routes, Route } from 'react-router';
import { Profile } from './components/intermediates/Profile';
import { SearchResultPage } from './components/intermediates/SearchResultPage';
import { Category, Recipe, User } from './types/types';


type AuthContextType = User | null;

export const AuthContext = createContext<AuthContextType>(null);

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [latest, setLatest] = useState<Recipe[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getCategories()
      .then((data: Category[]) => setCategories(data))
      .catch((e: Error) => console.error(e));
  }, []);

  useEffect(() => {
    getLatestRecipes()
      .then((data: Recipe[]) => setLatest(data))
      .catch((e: Error) => console.error(e));
  }, []);

  useEffect(() => {
    login({ email: 'zappe.thomson@test.com', password: 'Test123!' })
      .then((data: User) => setCurrentUser(data))
      .catch((e: Error) => console.error(e));
  }, []);

  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <Navbar />
        <main className="bg-lightbeige">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <div className="mx-8 py-4">
                    <CategoryList title="Recipe Categories" listItems={categories} />
                    <hr className="my-4 text-center h-[0.0625rem] bg-deepbrown border-0" />
                    <RecipeList title="New Added Recipes" recipes={latest} />
                  </div>
                </>
              }
            />
            <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />} />
            <Route path="/recipes/category/:category" element={<CategoryPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResultPage />} />
          </Routes>
        </main>
      </AuthContext.Provider>
    </>
  );
};

export default App;

//TODO: refactor to typescript
//TODO: front end testing
//TODO: FEAT: add redux
//TODO: GENERAL: create diagram of component structure
//TODO: write end-to-end tests
//TODO: BILL: app.jsx, main.jsx, uploadpage