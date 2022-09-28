import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import Header from "../components/Header";
import DifficultySelector from "../components/manageRecipe/DifficultySelector";
import DurationInput from "../components/manageRecipe/DurationInput";
import ManageList from "../components/manageRecipe/ManageList";
import Input from "../components/shared/Input";
import Difficulty from "../enums/Difficulty";
import styles from "../styles/ManagePage.module.css";

const ManagePage: NextPage = () => {
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

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2>Create a recipe</h2>
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
    </>
  );
};

export default ManagePage;
