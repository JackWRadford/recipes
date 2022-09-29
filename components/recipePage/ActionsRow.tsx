import { useRouter } from "next/router";
import { FC } from "react";
import { Recipe } from "../../models/Recipe";
import styles from "../../styles/ActionsRow.module.css";
import Button from "../shared/Button";

interface IActionsRow {
  recipe: Recipe;
}

const ActionsRow: FC<IActionsRow> = ({ recipe }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <Button
        type={"button"}
        name={"deleterecipe"}
        label={"Delete"}
        onClick={() => {}}
      />
      <Button
        type={"button"}
        name={"editrecipe"}
        label={"Edit"}
        onClick={() =>
          router.push({
            pathname: "/manage",
            query: { recipe: JSON.stringify(recipe) },
          })
        }
      />
    </div>
  );
};

export default ActionsRow;
