import { FC } from "react";
import { secondsToHoursMinutes } from "../../helper/convertion_helpers";
import { Recipe } from "../../models/recipe";
import styles from "../../styles/RecipeOverview.module.css";

interface IRecipeOverviewProps {
  recipe: Recipe;
}

/**
 * Overview details about the recipe, including: Name, description, cookingTime and difficulty.
 */
const RecipeOverview: FC<IRecipeOverviewProps> = ({ recipe }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>{recipe.name}</h1>
        <h4 className={styles.author}>{`By ${recipe.author}`}</h4>
        <p>{recipe.description}</p>
        <p className={styles.otherDetails}>{`Time: ${secondsToHoursMinutes(
          recipe.cookingTime
        )} • Difficulty: ${recipe.difficulty}`}</p>
      </div>
      {/* <div className={styles.imageContainer}></div> */}
    </div>
  );
};

export default RecipeOverview;
