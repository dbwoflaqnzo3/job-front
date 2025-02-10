"use client"
import styles from "./card.module.css";

export default function Card({
  children,
  padding = "16px",
  backgroundColor = "black-100",
  borderColor = "secondary-300",
  width,
  height,
}) {
  const style = {
    padding,
    backgroundColor: `var(--${backgroundColor})`,
    borderColor: `var(--${borderColor})`,
    width,
    height,
  };

  return (
    <div className={styles["card"]} style={style}>
      {children}
    </div>
  );
}