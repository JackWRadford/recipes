import { NextPage } from "next";
import Header from "../../components/Header";
import IngredientsList from "../../components/recipePage/IngredientsList";
import RecipeInstructions from "../../components/recipePage/RecipeInstructions";
import RecipeOverview from "../../components/recipePage/RecipeOverview";
import styles from "../../styles/RecipePage.module.css";

const RecipePage: NextPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <RecipeOverview />
        <div className={styles.contentWrapper}>
          <IngredientsList />
          <RecipeInstructions />
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
