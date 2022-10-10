import { FC, useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/Sidebar.module.css";
import LoginBtn from "../auth/LoginBtn";
import LogoutBtn from "../auth/LogoutBtn";
import SignUpBtn from "../auth/SignUpBtn";
import Backdrop from "../ui/Backdrop";
import AddRecipeBtn from "./AddRecipeBtn";
import FavouritesBtn from "./FavouritesBtn";
import PublishedBtn from "./PublishedBtn";
import ThemeBtn from "./themeBtn";

interface ISidebar {
  onClose: () => void;
}

/**
 * Sidebar for mobile. Shows Backdrop behind.
 */
const Sidebar: FC<ISidebar> = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const ref = useRef<HTMLElement | null>();
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById("overlays");
    setIsMounted(true);
  }, []);

  return (
    <>
      {mounted && ref.current
        ? ReactDOM.createPortal(<Backdrop onClick={onClose} />, ref.current)
        : null}
      {mounted && ref.current
        ? ReactDOM.createPortal(
            <div className={styles.wrapper}>
              <div className={styles.titleRow}>
                <IoMdClose
                  className={styles.closeBtn}
                  color="gray"
                  size={24}
                  onClick={onClose}
                />
                <ThemeBtn />
              </div>
              {!user ? (
                <>
                  <LoginBtn />
                  <SignUpBtn />
                </>
              ) : (
                <>
                  <FavouritesBtn closeSidebar={onClose} />
                  <PublishedBtn closeSidebar={onClose} />
                  <LogoutBtn />
                  <AddRecipeBtn closeSidebar={onClose} />
                </>
              )}
            </div>,
            ref.current
          )
        : null}
    </>
  );
};

export default Sidebar;
