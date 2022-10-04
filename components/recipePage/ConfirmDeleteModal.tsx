import { deleteDoc, doc } from "firebase/firestore/lite";
import { FC, useState } from "react";
import { db } from "../../firebaseConfig";
import { Recipe } from "../../models/recipe";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import styles from "../../styles/ConfirmDeleteModal.module.css";

interface IConfirmDeleteModalProps {
  onClose: () => void;
  recipe: Recipe;
}

const ConfirmDeleteModal: FC<IConfirmDeleteModalProps> = ({
  onClose,
  recipe,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteHandler = async () => {
    setIsLoading(true);
    const docRef = doc(db, "recipes", recipe.id!);
    try {
      await deleteDoc(docRef);
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
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
              "Are you sure? Once deleted you cannot recover this recipes's data!"
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
