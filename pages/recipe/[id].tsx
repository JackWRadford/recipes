import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import IngredientsList from "../../components/recipePage/IngredientsList";
import RecipeInstructions from "../../components/recipePage/RecipeInstructions";
import RecipeOverview from "../../components/recipePage/RecipeOverview";
import { db } from "../../firebaseConfig";
import { Recipe, recipeConverter } from "../../models/Recipe";
import styles from "../../styles/RecipePage.module.css";

const RecipePage: NextPage = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async (id: string) => {
      console.log("FIRESTORE: fetchRecipe");
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
