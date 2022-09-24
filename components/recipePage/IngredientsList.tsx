import styles from "../../styles/IngredientsList.module.css";

const ingredients: string[] = [
  "200g can tuna , whatever type you've got in the cupboard",
  "½ a bunch of spring onions , finely chopped",
  "4 tbsp mayonnaise",
  "3thick slices of granary or wholemeal bread",
  "50g cheddar , coarsely grated",
  "generous pinch of paprika",
];

const IngredientsList = () => {
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
