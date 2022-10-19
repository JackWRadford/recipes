import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ActionsRow from "../../components/recipePage/ActionsRow";
import IngredientsList from "../../components/recipePage/IngredientsList";
import InstructionsList from "../../components/recipePage/InstructionsList";
import RecipeOverview from "../../components/recipePage/RecipeOverview";
import { AuthContext } from "../../context/AuthContext";
import { Recipe } from "../../models/recipe";
import { fetchRecipe } from "../../services/db_service";
import styles from "../../styles/RecipePage.module.css";

/**
 * Page to show recipe details for the given recipe id in the path.
 */
const RecipePage: NextPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    /**
     * Call db_service to get the recipe data for `id`.
     *
     * @param id - Unique recipe id
     */
    const getRecipe = async (id: string) => {
      try {
        const recipeSnapshot = await fetchRecipe(id);
        if (recipeSnapshot.exists()) setRecipe(recipeSnapshot.data());
      } catch (error) {
        console.log("Error fetching recipe.");
      }
    };
    getRecipe(router.asPath.substring(8));
  }, [router.asPath]);

  return (
    <>
      {recipe && (
        <div>
          <Head>
            <title>{`${recipe.name} - Recipes`}</title>
            <meta name="description" content={recipe.description} />
          </Head>
          <div className={styles.wrapper}>
            {user && user.uid === recipe.userId && (
              <ActionsRow recipe={recipe} />
            )}
            <RecipeOverview recipe={recipe} />
            <div className={styles.contentWrapper}>
              <IngredientsList ingredients={recipe?.ingredients} />
              <InstructionsList instructions={recipe?.instructions} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
