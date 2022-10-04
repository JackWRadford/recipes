import { FC } from "react";
import Difficulty from "../../enums/difficulty";
import styles from "../../styles/DifficultySelector.module.css";
import Button from "../ui/Button";

interface IDifficultySelector {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
}

/**
 * Builds difficulty options from Difficulty enum, including which is selected based on the `difficulty` given
 */
const DifficultySelector: FC<IDifficultySelector> = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <>
      <h4 className={styles.title}>Difficulty</h4>
      <div className={styles.wrapper}>
        {(Object.keys(Difficulty) as Array<keyof typeof Difficulty>).map(
          (key) => (
            <Button
              key={key}
              className={`${styles.level} ${
                difficulty === key && styles.selected
              }`}
              type={"button"}
              name={key}
              label={key.toUpperCase()}
              onClick={() => setDifficulty(Difficulty[key])}
            />
          )
        )}
      </div>
    </>
  );
};

export default DifficultySelector;
