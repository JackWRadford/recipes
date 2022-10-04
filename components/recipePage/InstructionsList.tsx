import { FC } from "react";
import styles from "../../styles/RecipeInstructions.module.css";

interface IInstructionsListProps {
  instructions: string[];
}

/**
 * List of the recipe's `instructions` with the step number.
 */
const InstructionsList: FC<IInstructionsListProps> = ({ instructions }) => {
  /// Build list of instructions
  const instructionsList = instructions.map((instruction, index) => (
    <div key={index}>
      <h4 className={styles.stepTitle}>Step {index + 1}</h4>
      <p className={styles.stepContent}>{instruction}</p>
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      <h3>Instructions</h3>
      <ul className={styles.list}>{instructionsList}</ul>
    </div>
  );
};

export default InstructionsList;
