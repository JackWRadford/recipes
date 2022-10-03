import { FC } from "react";
import Difficulty from "../../enums/Difficulty";
import styles from "../../styles/DifficultySelector.module.css";
import Button from "../shared/Button";

interface IDifficultySelector {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
}

const DifficultySelector: FC<IDifficultySelector> = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <>
      <h4 className={styles.title}>Difficulty</h4>
      <div className={styles.wrapper}>
        <Button
          className={`${styles.level} ${
            difficulty === Difficulty.easy && styles.selected
          }`}
          type={"button"}
          name={"easy"}
          label={"Easy"}
          onClick={() => setDifficulty(Difficulty.easy)}
        />
        <Button
          className={`${styles.level} ${
            difficulty === Difficulty.medium && styles.selected
          }`}
          type={"button"}
          name={"medium"}
          label={"Medium"}
          onClick={() => setDifficulty(Difficulty.medium)}
        />
        <Button
          className={`${styles.level} ${
            difficulty === Difficulty.hard && styles.selected
          }`}
          type={"button"}
          name={"hard"}
          label={"Hard"}
          onClick={() => setDifficulty(Difficulty.hard)}
        />
      </div>
    </>
  );
};

export default DifficultySelector;
