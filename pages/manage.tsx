import { FirebaseError } from "firebase/app";
import { serverTimestamp } from "firebase/firestore/lite";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { ChangeEvent, FC, useContext, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import DifficultySelector from "../components/managePage/DifficultySelector";
import DurationInput from "../components/managePage/DurationInput";
import ManageList from "../components/managePage/ManageList";
import Button from "../components/ui/Button";
import ErrorMsg from "../components/ui/ErrorMsg";
import Input from "../components/ui/Input";
import { AuthContext } from "../context/AuthContext";
import Difficulty from "../enums/difficulty";
import { readableFromCode } from "../helper/firebase_errors";
import { Recipe } from "../models/recipe";
import { addRecipe, updateRecipe } from "../services/db_service";
import styles from "../styles/ManagePage.module.css";

interface IManagePageProps {
  router: { query: { recipe: string } };
}

/**
 * Page for either adding a new recipe or editing a recipe depending if a recipe is passed to the page.
 */
const ManagePage: FC<IManagePageProps & WithRouterProps> = ({ router }) => {
  /// Get the recipe data if passed to the page
  const recipe: Recipe | null = router.query.recipe
    ? JSON.parse(router.query.recipe)
    : null;

  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");

  /// Initialize state with the recipe data if a recipe was passed to the page
  const [name, setName] = useState(recipe ? recipe.name : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );
  const [ingredients, setIngredients] = useState<string[]>(
    recipe ? recipe.ingredients : []
  );
  const [steps, setSteps] = useState<string[]>(
    recipe ? recipe.instructions : []
  );
  const [difficulty, setDifficulty] = useState(
    recipe ? recipe.difficulty : Difficulty.easy
  );
  const [duration, setDuration] = useState(recipe ? recipe.cookingTime : 600);
  const [isLoading, setIsLoading] = useState(false);

  /**
   *  Add a new ingredient to the ingredients list
   *
   * @param ingredientValue - New ingredient
   */
  const onAddIngredientHandler = (ingredientValue: string) => {
    setIngredients((oldList) => {
      return [...oldList, ingredientValue];
    });
  };

  /**
   * Remove the ingredient with the `value` from the ingredients list
   *
   * @param value - Value of ingredient to remove
   */
  const onRemoveIngredientHandler = (value: string) => {
    setIngredients((oldList) => oldList.filter((e) => e !== value));
  };

  /**
   * Update ingredient at `index` with the new `value`
   *
   * @param index - Index of the ingredient to change
   * @param value - The new value of the ingredient
   */
  const onChangeIngredientHandler = (index: number, value: string) => {
    setIngredients((oldList) => {
      let newList = [...oldList];
      newList[index] = value;
      return newList;
    });
  };

  /**
   *  Add a new step to the steps list
   *
   * @param stepValue - New step
   */
  const onAddStepHandler = (stepValue: string) => {
    setSteps((oldList) => {
      return [...oldList, stepValue];
    });
  };

  /**
   * Remove the step with the `value` from the step list
   *
   * @param value - Value of step to remove
   */
  const onRemoveStepHandler = (value: string) => {
    setSteps((oldList) => oldList.filter((e) => e !== value));
  };

  /**
   * Update step at `index` with the new `value`
   *
   * @param index - Index of the step to change
   * @param value - The new value of the step
   */
  const onChangeStepHandler = (index: number, value: string) => {
    setSteps((oldList) => {
      let newList = [...oldList];
      newList[index] = value;
      return newList;
    });
  };

  /**
   * Set the difficulty value to `value`
   *
   * @param value - The new difficulty value
   */
  const onSetDifficultyHandler = (value: Difficulty) => {
    setDifficulty(value);
  };

  /**
   * Set the duration value to `value`
   *
   * @param value - The new duration value
   */
  const onSetDurationHandler = (value: number) => {
    setDuration(value);
  };

  /**
   * Add recipe to recipes collection if all fields are valid.
   */
  const onPublishHandler = async () => {
    setError("");
    if (!name) {
      setError("Please enter a name");
      return;
    }
    if (!description) {
      setError("Please enter a description");
      return;
    }
    if (!ingredients.length) {
      setError("Please add at least one ingredient");
      return;
    }
    if (!steps.length) {
      setError("Please add at least one instruction");
      return;
    }
    if (user) {
      const newRecipe: Recipe = new Recipe(
        name,
        user.displayName ?? "Anonymous",
        user.uid,
        description,
        duration,
        difficulty,
        ingredients,
        steps,
        "",
        serverTimestamp(),
        recipe ? recipe.id : undefined // Set id to current recipe id if editing (recipe is not null)
      );
      try {
        setIsLoading(true);
        if (!recipe) {
          // Add new recipe
          const newId = await addRecipe(newRecipe);
          // Navigate to the new recipe
          router.push(`/recipe/${newId}`);
        } else {
          // Update given recipe
          await updateRecipe(newRecipe);
          // Navigate to the updated recipe
          router.push(`/recipe/${newRecipe.id}`);
        }
      } catch (error) {
        console.log(error);
        if (error instanceof FirebaseError) {
          setError(readableFromCode(error.code));
        } else {
          setError("Something went wrong");
        }
      }
      setIsLoading(false);
    }
  };

  return user ? (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <h2>{recipe ? "Edit recipe" : "Create a recipe"}</h2>
        <Button
          type={"button"}
          name={"publish"}
          label={"Publish"}
          onClick={onPublishHandler}
          isLoading={isLoading}
        />
      </div>
      {error && <ErrorMsg message={error} />}
      <Input
        type={"text"}
        name={"recipename"}
        value={name}
        placeholder={"Name"}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          setName(event.currentTarget.value);
        }}
      />
      <Input
        type={"text"}
        name={"recipedescription"}
        value={description}
        placeholder={"Short description"}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          setDescription(event.currentTarget.value);
        }}
      />

      <ManageList
        listTitle={"Ingredients"}
        placeholder={"Add an ingredient (e.g. 100g chocolate)"}
        subPlaceholder={"Ingredient"}
        items={ingredients}
        onAdd={onAddIngredientHandler}
        onChange={onChangeIngredientHandler}
        onRemove={onRemoveIngredientHandler}
      />
      <ManageList
        listTitle={"Instructions"}
        placeholder={"Add a step (e.g. Pre-heat oven to 100 degrees celcius)"}
        subPlaceholder={"Step"}
        items={steps}
        onAdd={onAddStepHandler}
        onChange={onChangeStepHandler}
        onRemove={onRemoveStepHandler}
      />
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={onSetDifficultyHandler}
      />
      <DurationInput seconds={duration} setSeconds={onSetDurationHandler} />
    </div>
  ) : (
    <AuthBarrier label={"create a recipe"} />
  );
};

export default withRouter(ManagePage);
