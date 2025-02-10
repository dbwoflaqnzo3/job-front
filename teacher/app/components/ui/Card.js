"use client"
import styles from "./card.module.css";

export default function Card({
  children,
  margin = 0,
  padding = 16,
  paddingHorizontal,
  paddingVertical,
  backgroundColor = "black-100",
  borderColor = "secondary-300",
  width,
  height,
}) {
  paddingHorizontal = paddingHorizontal || padding;
  paddingVertical = paddingVertical || padding;

  const style = {
    margin,
    paddingLeft: paddingHorizontal,
    paddingRight: paddingHorizontal,
    paddingTop: paddingVertical,
    paddingBottom: paddingVertical,
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