"use client"
import styles from "./card.module.css";

export default function Card({
  children,
  margin = 0,
  padding = 16,
  paddingHorizontal,
  paddingVertical,
  border = false,
  backgroundColor = "black-100",
  borderColor = "secondary-300",
  justifyItems = "center",
  alignItems = "center",
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
    borderColor: border ? `var(--${borderColor})` : "transparent",
    justifyItems,
    alignItems,
    width,
    height,
  };

  return (
    <div className={styles["card"]} style={style}>
      {children}
    </div>
  );
}