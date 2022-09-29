import { NextPage } from "next";
import { useContext } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/FavouritesPage.module.css";

const FavouritesPage: NextPage = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header />
      {authCtx ? (
        <div className={styles.contentWrapper}>
          <h2>Favourites</h2>
        </div>
      ) : (
        <AuthBarrier label={"see your favourite recipes"} />
      )}
    </>
  );
};

export default FavouritesPage;
