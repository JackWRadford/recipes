import { useRouter } from "next/router";
import { FC } from "react";
import Button from "../ui/Button";

/**
 * Navigates to the published page
 */
const PublishedBtn = () => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/published");
  };

  return (
    <Button
      secondary={true}
      type={"button"}
      name={"yourrecipes"}
      label={"Published"}
      onClick={onClickHandler}
    />
  );
};

export default PublishedBtn;
