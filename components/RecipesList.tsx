import { FC } from "react";
import { Recipe } from "../models/recipe";
import styles from "../styles/RecipesList.module.css";
import RecipeCard from "./RecipeCard";
import Button from "./ui/Button";

interface IRecipesListProps {
  recipes: Recipe[];
  loadMore: () => {};
  noMoreRecipes: boolean;
  isLoading: boolean;
}

const RecipesList: FC<IRecipesListProps> = ({
  recipes,
  loadMore,
  noMoreRecipes,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper}>
      {!recipes.length && <p className={styles.noRecipes}>No recipes found</p>}
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
      <div className={styles.loadMore}>
        {recipes.length ? (
          !noMoreRecipes ? (
            <Button
              type={"button"}
              name={"loadmore"}
              label={"Load more"}
              onClick={loadMore}
              isLoading={isLoading}
            />
          ) : (
            <p>No more recipes</p>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RecipesList;
