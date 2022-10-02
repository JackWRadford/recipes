import { FC } from "react";
import { Recipe } from "../../models/Recipe";
import styles from "../../styles/RecipeOverview.module.css";

interface IRecipeOverviewProps {
  recipe: Recipe;
}

const RecipeOverview: FC<IRecipeOverviewProps> = ({ recipe }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>{recipe.name}</h1>
        <h4 className={styles.author}>{`By ${recipe.author}`}</h4>
        <p>{recipe.description}</p>
      </div>
      {/* <div className={styles.imageContainer}></div> */}
    </div>
  );
};

export default RecipeOverview;
