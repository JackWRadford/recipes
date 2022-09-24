import styles from "../../styles/RecipeOverview.module.css";

const RecipeOverview = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.title}>Cheesy tuna melts</h1>
        <h4 className={styles.author}>By Jack Radford</h4>
        <p>A tasty change from cheese on toast!</p>
      </div>
      <div className={styles.imageContainer}></div>
    </div>
  );
};

export default RecipeOverview;
