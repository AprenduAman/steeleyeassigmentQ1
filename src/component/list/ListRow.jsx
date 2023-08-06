import React from "react";
import styles from "./ListRow.module.css";

const ListCell = ({ children, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <tr className={styles.cell} onClick={handleClick}>
      {children}
    </tr>
  );
};

export default ListCell;
