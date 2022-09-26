import styles from "../styles/RecipesList.module.css";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
  return (
    <div className={styles.wrapper}>
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  );
};

export default RecipesList;
