import { FC } from "react";
import styles from "../../styles/RecipeInstructions.module.css";

const instructions: string[] = [
  "Preheat the grill on its highest setting. Drain the tuna, flake it into a bowl and mix with the spring onions and mayonnaise. Season with salt and plenty of freshly ground black pepper.",
  "Toast the bread under the grill until it’s nicely browned on both sides, then spread the tuna mixture on top, right up to the edges of the toast. Scatter over the cheese and put back under the grill until the cheese is bubbling.",
  "Slice in half, sprinkle with paprika and tuck in.",
];

const RecipeInstructions = () => {
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
