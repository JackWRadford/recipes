import React, { FC } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

interface ILayoutProps {
  children: React.ReactNode;
}

/**
 * Adds Header and Footer above and below the `children`.
 *
 * @param children - The components rendered between the header and footer
 */
const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
