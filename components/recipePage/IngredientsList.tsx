import { FC } from "react";
import styles from "../../styles/IngredientsList.module.css";

interface IIngredientsProps {
  ingredients: string[];
}

const IngredientsList: FC<IIngredientsProps> = ({ ingredients }) => {
  const ingredientItems = ingredients.map((e, index) => (
    <li key={index}>{e}</li>
  ));

  return (
    <div className={styles.wrapper}>
      <h3>Ingredients</h3>
      <ul className={styles.list}>{ingredientItems}</ul>
    </div>
  );
};

export default IngredientsList;
