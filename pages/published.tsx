import { NextPage } from "next";
import { useContext } from "react";
import AuthBarrier from "../components/auth/AuthBarrier";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/PublishedPage.module.css";

const PublishedPage: NextPage = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header />
      {authCtx ? (
        <div className={styles.contentWrapper}>
          <h2>Your recipes</h2>
        </div>
      ) : (
        <AuthBarrier label={"see your recipes"} />
      )}
    </>
  );
};

export default PublishedPage;
