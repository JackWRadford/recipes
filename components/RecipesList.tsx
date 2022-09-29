import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RecipesContext } from "../context/RecipesContext";
import styles from "../styles/RecipesList.module.css";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
  const recipesCtx = useContext(RecipesContext);

  return (
    <div className={styles.wrapper}>
      {recipesCtx.recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};

export default RecipesList;
