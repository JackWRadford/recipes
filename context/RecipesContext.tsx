import { createContext, FC, useEffect, useState } from "react";
import { Recipe, recipeConverter } from "../models/Recipe";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore/lite";

interface IRecipesContext {
  recipes: Recipe[];
}

const RecipesContext = createContext<IRecipesContext>({ recipes: [] });

interface IRecipesProviderProps {
  children: React.ReactNode;
}

const RecipesProvider: FC<IRecipesProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    /// Get recipes from firestore
    const fetchRecipes = async () => {
      const recipesCol = collection(db, "recipes").withConverter(
        recipeConverter
      );
      const recipesSnapshot = await getDocs(recipesCol);
      const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
      setRecipes(recipesList);
      console.log(recipesList);
      return recipesList;
    };

    fetchRecipes();
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes: recipes }}>
      {children}
    </RecipesContext.Provider>
  );
};

export { RecipesContext, RecipesProvider };
