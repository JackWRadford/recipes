import { FC } from "react";
import styles from "../../styles/RecipeInstructions.module.css";

interface IInstructionsProps {
  instructions: string[];
}

const RecipeInstructions: FC<IInstructionsProps> = ({ instructions }) => {
  const instructionsList = instructions.map((e, index) => (
    <StepListItem key={index} index={index + 1} content={e} />
  ));

  return (
    <div className={styles.wrapper}>
      <h3>Instructions</h3>
      <ul className={styles.list}>{instructionsList}</ul>
    </div>
  );
};

interface StepListItemProps {
  index: number;
  content: string;
}

const StepListItem: FC<StepListItemProps> = (props) => {
  return (
    <div>
      <h4 className={styles.stepTitle}>Step {props.index}</h4>
      <p className={styles.stepContent}>{props.content}</p>
    </div>
  );
};

export default RecipeInstructions;
