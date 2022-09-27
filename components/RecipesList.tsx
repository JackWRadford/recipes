import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Lists, ListsContext } from "../context/ListsContext";
import { RecipesContext } from "../context/RecipesContext";
import styles from "../styles/RecipesList.module.css";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
  const userCtx = useContext(AuthContext);
  const listsCtx = useContext(ListsContext);
  const recipesCtx = useContext(RecipesContext);

  const getTitle = (list: Lists): string => {
    console.log("get title");
    switch (list) {
      case Lists.saved:
        return "Favourites";
      case Lists.users:
        return "Your Recipes";
      default:
        break;
    }
    return "";
  };

  const title = getTitle(listsCtx.currentList);

  return (
    <div className={styles.wrapper}>
      {userCtx && title && <h2 className={styles.listTitle}>{title}</h2>}
      {recipesCtx.recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};

export default RecipesList;
