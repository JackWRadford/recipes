import { QueryDocumentSnapshot } from "firebase/firestore/lite";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import RecipesList from "../components/RecipesList";
import { AuthContext } from "../context/AuthContext";
import { Recipe } from "../models/recipe";
import { fetchRecipes } from "../services/db_service";
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
      try {
        const { recipes, last } = await fetchRecipes(favs);
        setIsFirstLoad(false);
        setLastRecipe(last);
        setFavourites(recipes);
      } catch (error) {
        console.log("Error when fetching favourite recipes.");
      }
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
    } catch (error) {
      console.log("Error loading more recipes.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      {user ? (
        <div className={styles.contentWrapper}>
          <h2>Favourites</h2>
          <RecipesList
            recipes={favourites}
            loadMore={loadMore}
            noMoreRecipes={typeof lastRecipe === "undefined"}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <AuthBarrier label={"see your favourite recipes"} />
      )}
      <Footer />
    </>
  );
};

export default FavouritesPage;
