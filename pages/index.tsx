import { QueryDocumentSnapshot } from "firebase/firestore/lite";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import { Recipe } from "../models/recipe";
import { fetchRecipes, RECIPE_FETCH_LIMIT } from "../services/db_service";
import styles from "../styles/HomePage.module.css";

/**
 * Page that shows recipes and search option.
 */
const HomePage: NextPage = () => {
  const [recipesList, setRecipes] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noMoreRecipes, setNoMoreRecipes] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      try {
        const { recipes, last } = await fetchRecipes();
        setLastRecipe(last);
        setRecipes(recipes);
        setNoMoreRecipes(recipes.length < RECIPE_FETCH_LIMIT);
      } catch (error) {
        console.log("Error when loading initial recipes");
      }
      setIsLoading(false);
    };
    getRecipes();
  }, []);

  /**
   * Load more recipes. (recipes after lastRecipe)
   */
  const loadMore = async () => {
    if (!lastRecipe) return;
    setIsLoading(true);
    const { recipes, last } = await fetchRecipes(
      undefined,
      undefined,
      lastRecipe,
      searchTerm ? searchTerm : undefined
    );
    setLastRecipe(last);
    setRecipes((oldRecipes) => [...oldRecipes, ...recipes]);
    setNoMoreRecipes(recipes.length < RECIPE_FETCH_LIMIT);
    setIsLoading(false);
  };

  /**
   * Fetch recipes where the names include one or more of the words in the `userQuery`
   *
   * @param userQuery - The search query
   */
  const onSearchHandler = async (userQuery: string) => {
    setIsLoading(true);
    userQuery.trim().toLowerCase();
    const { recipes, last } = await fetchRecipes(
      undefined,
      undefined,
      undefined,
      userQuery ? userQuery : undefined
    );
    setLastRecipe(last);
    setRecipes(recipes);
    setSearchTerm(userQuery);
    setNoMoreRecipes(recipes.length < RECIPE_FETCH_LIMIT);
    setIsLoading(false);
  };

  return (
    <div className={styles.contentWrapper}>
      <RecipesList
        recipes={recipesList}
        loadMore={loadMore}
        noMoreRecipes={noMoreRecipes}
        isLoading={isLoading}
      />
      <SearchArea onSubmit={onSearchHandler} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
