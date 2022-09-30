import { useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";
import styles from "../styles/RecipesList.module.css";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
  const recipesCtx = useContext(RecipesContext);

  return (
    <div className={styles.wrapper}>
      {!recipesCtx.recipes.length && (
        <p className={styles.noRecipes}>No recipes found</p>
      )}
      {recipesCtx.recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};

export default RecipesList;
