import Button from "../shared/Button";
import Input from "../shared/Input";
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
          <ListItem
            key={index}
            name={item}
            placeholder={subPlaceholder}
            index={index}
            onRemove={onRemove}
            onChange={onChange}
          />
        ))}
      </div>
    </>
  );
};

interface IListItem {
  name: string;
  placeholder: string;
  index: number;
  onRemove: (value: string) => void;
  onChange: (index: number, value: string) => void;
}

const ListItem: FC<IListItem> = ({
  name,
  placeholder,
  index,
  onRemove,
  onChange,
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(index, e.currentTarget.value);
  };

  return (
    <div className={styles.listItem}>
      <IoMdClose
        className={styles.closeBtn}
        color="gray"
        size={24}
        onClick={() => onRemove(name)}
      />
      <Input
        type={"text"}
        name={`item${index}`}
        value={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default ManageList;
