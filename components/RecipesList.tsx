import { FC } from "react";
import { Recipe } from "../models/recipe";
import styles from "../styles/RecipesList.module.css";
import RecipeCard from "./RecipeCard";
import Button from "./ui/Button";
import LoadingIndicator from "./ui/LoadingIndicator";

interface IRecipesListProps {
  recipes: Recipe[];
  loadMore: () => {};
  noMoreRecipes: boolean;
  isLoading: boolean;
}

/**
 * Builds a list of the given `recipes`. Includes a button that calls `loadMore` to get more recipes, unless there are `noMoreRecipes`.
 */
const RecipesList: FC<IRecipesListProps> = ({
  recipes,
  loadMore,
  noMoreRecipes,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper}>
      {!recipes.length &&
        (isLoading ? (
          <div className={styles.loading}>
            <LoadingIndicator />
          </div>
        ) : (
          <p className={styles.noRecipes}>No recipes found</p>
        ))}
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
