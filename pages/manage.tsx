import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore/lite";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import { ChangeEvent, FC, useContext, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Header from "../components/Header";
import DifficultySelector from "../components/manageRecipe/DifficultySelector";
import DurationInput from "../components/manageRecipe/DurationInput";
import ManageList from "../components/manageRecipe/ManageList";
import Button from "../components/shared/Button";
import ErrorMsg from "../components/shared/ErrorMsg";
import Input from "../components/shared/Input";
import { AuthContext } from "../context/AuthContext";
import Difficulty from "../enums/Difficulty";
import { db } from "../firebaseConfig";
import { readableFromCode } from "../helper/FirebaseErrors";
import { Recipe, recipeConverter } from "../models/Recipe";
import styles from "../styles/ManagePage.module.css";

interface IManagePageProps {
  router: { query: { recipe: string } };
}

const ManagePage: FC<IManagePageProps & WithRouterProps> = ({ router }) => {
  const recipe: Recipe | null = router.query.recipe
    ? JSON.parse(router.query.recipe)
    : null;

  const userCtx = useContext(AuthContext);
  const [error, setError] = useState("");
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

  const onAddIngredientHandler = (ingredientValue: string) => {
    setIngredients((oldList) => {
      return [...oldList, ingredientValue];
    });
  };

  const onRemoveIngredientHandler = (value: string) => {
    setIngredients((oldList) => oldList.filter((e) => e !== value));
  };

  const onChangeIngredientHandler = (index: number, value: string) => {
    setIngredients((oldList) => {
      let newList = [...oldList];
      newList[index] = value;
      return newList;
    });
  };

  const onAddStepHandler = (stepValue: string) => {
    setSteps((oldList) => {
      return [...oldList, stepValue];
    });
  };

  const onRemoveStepHandler = (value: string) => {
    setSteps((oldList) => oldList.filter((e) => e !== value));
  };

  const onChangeStepHandler = (index: number, value: string) => {
    setSteps((oldList) => {
      let newList = [...oldList];
      newList[index] = value;
      return newList;
    });
  };

  const onSetDifficultyHandler = (value: Difficulty) => {
    setDifficulty(value);
  };

  const onSetDurationHandler = (value: number) => {
    setDuration(value);
  };

  /// Add recipe to recipes collection
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
    if (userCtx) {
      // Set id to current recipe id if editing (recipe is not null)
      const newRecipe: Recipe = new Recipe(
        name,
        userCtx.displayName ?? "Anonymous",
        userCtx.uid,
        description,
        duration,
        difficulty,
        ingredients,
        steps,
        "",
        serverTimestamp(),
        recipe ? recipe.id : undefined
      );
      try {
        setIsLoading(true);
        if (!recipe) {
          // Add new recipe
          await addDoc(
            collection(db, "recipes").withConverter(recipeConverter),
            newRecipe
          );
        } else {
          // Update given recipe
          const docRef = doc(db, "recipes", recipe.id!).withConverter(
            recipeConverter
          );
          await setDoc(docRef, newRecipe, { merge: true });
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        if (error instanceof FirebaseError) {
          setError(readableFromCode(error.code));
        } else {
          setError("Something went wrong");
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {userCtx ? (
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
            placeholder={
              "Add a step (e.g. Pre-heat oven to 100 degrees celcius)"
            }
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
      )}
    </>
  );
};

export default withRouter(ManagePage);
