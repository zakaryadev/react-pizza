import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <span>😒</span> <br />
        Nothing to found
      </h1>
      <p className={styles.desc}>
        Sorry, but page with route <code>{window.location.pathname}</code> not
        founded in our E-Commerce
      </p>
    </div>
  );
};

export default NotFoundBlock;
