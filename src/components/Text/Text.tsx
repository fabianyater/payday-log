import React from "react";
import styles from "./Text.module.css";

export type TextProps = {
  text: string;
  value: string;
};

const Text: React.FC<TextProps> = ({ text, value }) => {
  return (
    <p className={styles.total}>
      {text} <span>{value}</span>{" "}
    </p>
  );
};

export default Text;
