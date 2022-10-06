import { deleteDoc, doc } from "firebase/firestore/lite";
import { FC, useState } from "react";
import { db } from "../../firebaseConfig";
import { Recipe } from "../../models/recipe";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import styles from "../../styles/ConfirmDeleteModal.module.css";
import { deleteRecipe } from "../../services/db_service";

interface IConfirmDeleteModalProps {
  onClose: () => void;
  recipe: Recipe;
}

/**
 * Modal to get user confirmation before deleting the given `recipe`
 */
const ConfirmDeleteModal: FC<IConfirmDeleteModalProps> = ({
  onClose,
  recipe,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  /**

   * Delete the `recipe`.
   */
  const onDeleteHandler = async () => {
    setIsLoading(true);
    try {
      await deleteRecipe(recipe.id!);
      onClose();
    } catch (error) {
      console.log("Error while deleting recipe.");
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title={"Confirm recipe deletion"}
      onClose={onClose}
      content={
        <div className={styles.wrapper}>
          <p>
            {
              "Are you sure? Once deleted you cannot recover this recipes' data!"
            }
          </p>
          <Button
            type={"button"}
            name={"delete"}
            label={"Delete"}
            onClick={onDeleteHandler}
            isLoading={isLoading}
          />
        </div>
      }
    />
  );
};

export default ConfirmDeleteModal;
