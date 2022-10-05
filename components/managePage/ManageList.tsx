import Button from "../ui/Button";
import Input from "../ui/Input";
import styles from "../../styles/ManageItems.module.css";
import { ChangeEvent, FC, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface IManageListProps {
  listTitle: string;
  placeholder: string;
  subPlaceholder: string;
  items: string[];
  onAdd: (value: string) => void;
  onChange: (index: number, value: string) => void;
  onRemove: (value: string) => void;
}

/**
 * For input of a list of strings.
 */
const ManageList: FC<IManageListProps> = ({
  listTitle,
  placeholder,
  subPlaceholder,
  items,
  onAdd,
  onChange,
  onRemove,
}) => {
  const [itemValue, setItemValue] = useState("");

  /**
   * Add new string to the list and clear the main input.
   */
  const onAddHandler = () => {
    if (itemValue.trim()) {
      onAdd(itemValue);
      setItemValue("");
    }
  };

  return (
    <>
      <h4 className={styles.title}>{listTitle}</h4>
      <div className={styles.addItem}>
        <Input
          type={"text"}
          name={"additem"}
          value={itemValue}
          placeholder={placeholder}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setItemValue(event.currentTarget.value);
          }}
        />
        <Button
          type={"button"}
          name={"additembtn"}
          label={"Add"}
          onClick={onAddHandler}
        />
      </div>
      <div className={styles.itemList}>
        {items.map((item, index) => (
          <div key={index} className={styles.listItem}>
            <IoMdClose
              className={styles.closeBtn}
              color="gray"
              size={24}
              onClick={() => onRemove(item)}
            />
            <Input
              type={"text"}
              name={`item${index}`}
              value={item}
              placeholder={subPlaceholder}
              onChange={(e) => onChange(index, e.currentTarget.value)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageList;
