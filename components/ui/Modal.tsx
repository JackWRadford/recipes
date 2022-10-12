import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";
import styles from "../../styles/Modal.module.css";
import Backdrop from "./Backdrop";

interface ModalOverlayProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

/**
 * Generic modal that shows the given `title` and `content` and calls `onClose` when the close button is clicked.
 */
const ModalOverlay: React.FC<ModalOverlayProps> = ({
  title,
  content,
  onClose,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <IoMdClose
          className={styles.closeBtn}
          color="gray"
          size={24}
          onClick={onClose}
        />
      </div>
      {content}
    </div>
  );
};

interface ModelProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

/**
 * Renders the Backdrop and ModalOverlay with the given props, with portals.
 */
const Modal: React.FC<ModelProps> = ({ title, content, onClose }) => {
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
            <ModalOverlay content={content} title={title} onClose={onClose} />,
            ref.current
          )
        : null}
    </>
  );
};

export default Modal;
