import { QueryDocumentSnapshot } from "firebase/firestore/lite";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import RecipesList from "../components/RecipesList";
import SearchArea from "../components/SearchArea";
import { Recipe } from "../models/recipe";
import { fetchRecipes } from "../services/db_service";
import styles from "../styles/HomePage.module.css";

/**
 * Page that shows recipes and search option.
 */
const HomePage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      const { recipes, last } = await fetchRecipes();
      setLastRecipe(last);
      setRecipes(recipes);
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
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <div className={styles.contentWrapper}>
        <RecipesList
          recipes={recipes}
          loadMore={loadMore}
          noMoreRecipes={typeof lastRecipe === "undefined"}
          isLoading={isLoading}
        />
        <SearchArea onSubmit={onSearchHandler} isLoading={isLoading} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
