import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😘</span>
        <br />
        Ничего не найдено
        <p className={styles.description}>
          К сожалению станицы нет у нас на сайте!
        </p>
      </h1>
    </div>
  );
};

export default NotFoundBlock;
