import { useRouter } from "next/router";
import { FC } from "react";
import { FaThList } from "react-icons/fa";
import Button from "../ui/Button";

interface IPublishedBtnProps {
  isMobile: boolean;
}

/**
 * Navigates to the published page
 */
const PublishedBtn: FC<IPublishedBtnProps> = ({ isMobile }) => {
  const router = useRouter();

  return isMobile ? (
    <FaThList onClick={() => router.push("/published")} />
  ) : (
    <Button
      secondary={true}
      type={"button"}
      name={"yourrecipes"}
      label={"Published"}
      onClick={() => router.push("/published")}
    />
  );
};

export default PublishedBtn;
