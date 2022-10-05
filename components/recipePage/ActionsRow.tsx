import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Recipe } from "../../models/recipe";
import styles from "../../styles/ActionsRow.module.css";
import Button from "../ui/Button";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface IActionsRow {
  recipe: Recipe;
}

/**
 * Includes delete and edit options for the `recipe`
 */
const ActionsRow: FC<IActionsRow> = ({ recipe }) => {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const onDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  const onCloseHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.wrapper}>
      {showConfirmModal && (
        <ConfirmDeleteModal onClose={onCloseHandler} recipe={recipe} />
      )}
      <Button
        type={"button"}
        name={"deleterecipe"}
        label={"Delete"}
        onClick={onDeleteHandler}
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
