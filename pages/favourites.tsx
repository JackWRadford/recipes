import { QueryDocumentSnapshot } from "firebase/firestore/lite";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import RecipesList from "../components/RecipesList";
import { AuthContext } from "../context/AuthContext";
import { Recipe } from "../models/recipe";
import { fetchRecipes, RECIPE_FETCH_LIMIT } from "../services/db_service";
import styles from "../styles/FavouritesPage.module.css";

/**
 * Page that shows the current users favourited recipes.
 */
const FavouritesPage: NextPage = () => {
  const { user, favs } = useContext(AuthContext);
  const [favourites, setFavourites] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [noMoreRecipes, setNoMoreRecipes] = useState(false);

  useEffect(() => {
    /**
     * Fetch favourite recipes if there are any.
     */
    const getFavourites = async () => {
      if (!user || !isFirstLoad) return;
      if (!favs.length) {
        setFavourites([]);
        return;
      }
      setIsLoading(true);
      try {
        const { recipes, last } = await fetchRecipes(favs);
        setIsFirstLoad(false);
        setLastRecipe(last);
        setFavourites(recipes);
        setNoMoreRecipes(recipes.length < RECIPE_FETCH_LIMIT);
      } catch (error) {
        console.log("Error when fetching favourite recipes.");
      }
      setIsLoading(false);
    };

    getFavourites();
  }, [user, favs, isFirstLoad]);

  /**
   * Load more favourite recipes. (recipes after lastRecipe)
   */
  const loadMore = async () => {
    if (!lastRecipe) return;
    setIsLoading(true);
    try {
      const { recipes, last } = await fetchRecipes(favs, undefined, lastRecipe);
      setLastRecipe(last);
      setFavourites((oldRecipes) => [...oldRecipes, ...recipes]);
      setNoMoreRecipes(recipes.length < RECIPE_FETCH_LIMIT);
    } catch (error) {
      console.log("Error loading more recipes.");
    }
    setIsLoading(false);
  };

  return user ? (
    <div className={styles.contentWrapper}>
      <h2>Favourites</h2>
      <RecipesList
        recipes={favourites}
        loadMore={loadMore}
        noMoreRecipes={noMoreRecipes}
        isLoading={isLoading}
      />
    </div>
  ) : (
    <AuthBarrier label={"see your favourite recipes"} />
  );
};

export default FavouritesPage;
