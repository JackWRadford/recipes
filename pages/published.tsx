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
import styles from "../styles/PublishedPage.module.css";

/**
 * Page to show users published recipes.
 */
const PublishedPage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [published, setPublished] = useState<Recipe[]>([]);
  const [lastRecipe, setLastRecipe] = useState<QueryDocumentSnapshot<Recipe>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /**
     * Fetch users published recipes.
     */
    const getPublished = async () => {
      if (!user) return;
      const { recipes, last } = await fetchRecipes(undefined, user?.uid);
      setLastRecipe(last);
      setPublished(recipes);
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
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      {user ? (
        <div className={styles.contentWrapper}>
          <h2>Your recipes</h2>
          <RecipesList
            recipes={published}
            loadMore={loadMore}
            noMoreRecipes={typeof lastRecipe === "undefined"}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <AuthBarrier label={"see your recipes"} />
      )}
      <Footer />
    </>
  );
};

export default PublishedPage;
