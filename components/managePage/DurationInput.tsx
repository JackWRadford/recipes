import { ChangeEvent, FC } from "react";
import styles from "../../styles/DurationInput.module.css";
import Input from "../ui/Input";

interface IDurationInput {
  seconds: number;
  setSeconds: (value: number) => void;
}

/**
 * Takes and displays duration input in minutes, but, handles the duration in seconds.
 */
const DurationInput: FC<IDurationInput> = ({ seconds, setSeconds }) => {
  return (
    <>
      <h4 className={styles.title}>Duration (minutes)</h4>
      <div className={styles.wrapper}>
        <Input
          type={"number"}
          name={"minutes"}
          value={seconds / 60}
          placeholder={"minutes"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSeconds(+event.currentTarget.value * 60);
          }}
        />
      </div>
    </>
  );
};

export default DurationInput;
