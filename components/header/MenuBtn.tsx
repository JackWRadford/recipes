import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";

const MenuBtn = () => {
  const [showSidebar, setSidebar] = useState(false);

  const onClickSidebarIcon = () => {
    setSidebar(true);
  };

  const onClose = () => {
    setSidebar(false);
  };

  return (
    <>
      {showSidebar && <Sidebar onClose={onClose} />}
      <FiMenu size={24} onClick={onClickSidebarIcon} />
    </>
  );
};

export default MenuBtn;
