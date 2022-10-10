import { useRouter } from "next/router";
import { FC } from "react";
import Button from "../ui/Button";

interface IPublishedBtnProps {
  closeSidebar?: () => void;
}

/**
 * Navigates to the published page
 */
const PublishedBtn: FC<IPublishedBtnProps> = ({ closeSidebar }) => {
  const router = useRouter();

  const onClickHandler = () => {
    if (closeSidebar) closeSidebar();
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
