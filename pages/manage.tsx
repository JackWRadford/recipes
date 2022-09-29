import type { NextPage } from "next";
import { ChangeEvent, useContext, useState } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Header from "../components/Header";
import DifficultySelector from "../components/manageRecipe/DifficultySelector";
import DurationInput from "../components/manageRecipe/DurationInput";
import ManageList from "../components/manageRecipe/ManageList";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import { AuthContext } from "../context/AuthContext";
import Difficulty from "../enums/Difficulty";
import styles from "../styles/ManagePage.module.css";

const ManagePage: NextPage = () => {
  const userCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(Difficulty.easy);
  const [duration, setDuration] = useState(600);

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

  const onPublishHandler = async () => {};

  return (
    <>
      <Header />
      {userCtx ? (
        <div className={styles.wrapper}>
          <div className={styles.titleRow}>
            <h2>Create a recipe</h2>
            <Button
              type={"button"}
              name={"publish"}
              label={"Publish"}
              onClick={onPublishHandler}
            />
          </div>
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

export default ManagePage;
