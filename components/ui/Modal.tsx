import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";
import styles from "../../styles/Modal.module.css";

/// Backdrop behind modal
const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

interface ModalOverlayProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

/// Modal on top of backdrop
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

/// Render modal overlay and backdrop
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
