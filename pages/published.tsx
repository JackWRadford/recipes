import { QueryDocumentSnapshot } from "firebase/firestore/lite";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import RecipesList from "../components/RecipesList";
import { AuthContext } from "../context/AuthContext";
import { Recipe } from "../models/recipe";
import { fetchRecipes, RECIPE_FETCH_LIMIT } from "../services/db_service";
import styles from "../styles/PublishedPage.module.css";

/**
 * Page to show users published recipes.
 */
const PublishedPage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [published, setPublished] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);
  const [noMoreRecipes, setNoMoreRecipes] = useState(false);

  useEffect(() => {
    /**
     * Fetch users published recipes.
     */
    const getPublished = async () => {
      if (!user) return;
      setIsLoading(true);
      const { recipes, last } = await fetchRecipes(undefined, user?.uid);
      setLastRecipe(last);
      setPublished(recipes);
      setNoMoreRecipes(recipes.length < RECIPE_FETCH_LIMIT);
      setIsLoading(false);
    };

    getPublished();
  }, [user]);

  /**
   * Load more of the users published recipes. (recipes after lastRecipe)
   */
  const loadMore = async () => {
    if (!lastRecipe) return;
    setIsLoading(true);
    const { recipes, last } = await fetchRecipes(
      undefined,
      user?.uid,
      lastRecipe
    );
    setLastRecipe(last);
    setPublished((oldRecipes) => [...oldRecipes, ...recipes]);
    setNoMoreRecipes(recipes.length < RECIPE_FETCH_LIMIT);
    setIsLoading(false);
  };

  return user ? (
    <div className={styles.contentWrapper}>
      <h2>Your recipes</h2>
      <RecipesList
        recipes={published}
        loadMore={loadMore}
        noMoreRecipes={noMoreRecipes}
        isLoading={isLoading}
      />
    </div>
  ) : (
    <AuthBarrier label={"see your recipes"} />
  );
};

export default PublishedPage;
