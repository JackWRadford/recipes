import { FC } from "react";
import { Recipe } from "../models/Recipe";
import styles from "../styles/RecipesList.module.css";
import RecipeCard from "./RecipeCard";

interface IRecipesListProps {
  recipes: Recipe[];
}

const RecipesList: FC<IRecipesListProps> = ({ recipes }) => {
  return (
    <div className={styles.wrapper}>
      {!recipes.length && <p className={styles.noRecipes}>No recipes found</p>}
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};

export default RecipesList;
