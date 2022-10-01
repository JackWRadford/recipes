import { doc, getDoc } from "firebase/firestore/lite";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import ActionsRow from "../../components/recipePage/ActionsRow";
import IngredientsList from "../../components/recipePage/IngredientsList";
import RecipeInstructions from "../../components/recipePage/RecipeInstructions";
import RecipeOverview from "../../components/recipePage/RecipeOverview";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebaseConfig";
import { Recipe, recipeConverter } from "../../models/Recipe";
import styles from "../../styles/RecipePage.module.css";

const RecipePage: NextPage = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("FIRESTORE: fetchRecipe");
    const fetchRecipe = async (id: string) => {
      const docRef = doc(db, "recipes", id).withConverter(recipeConverter);
      const recipeSnapshot = await getDoc(docRef);
      if (recipeSnapshot.exists()) setRecipe(recipeSnapshot.data());
    };
    fetchRecipe(router.asPath.substring(8));
  }, [router.asPath]);

  return (
    <div>
      <Header />
      {recipe && (
        <div className={styles.wrapper}>
          {user && user.uid === recipe.userId && <ActionsRow recipe={recipe} />}
          <RecipeOverview recipe={recipe} />
          <div className={styles.contentWrapper}>
            <IngredientsList ingredients={recipe?.ingredients} />
            <RecipeInstructions instructions={recipe?.instructions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
