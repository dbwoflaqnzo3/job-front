"use client"
import styles from "./card.module.css";

export default function Card({
  theme = "primary",
  children,
  margin = 0,
  padding = 16,
  paddingHorizontal,
  paddingVertical,
  border = false,
  background = false,
  transparent = false,
  justifyItems = "center",
  alignItems = "center",
  borderRadius = 16,
  width,
  height,
}) {
  paddingHorizontal = paddingHorizontal || padding;
  paddingVertical = paddingVertical || padding;

  const borderColor = `var(--${theme}-300)`;
  const backgroundColor = `var(--background-${theme === "primary" ? "student" : "teacher"})`;

  const colorStyle = {
    "--border-color": border ? borderColor : "transparent",
    "--background-color": transparent ? "transparent" : background ? backgroundColor : "var(--black-100)",
  };

  const style = {
    margin,
    paddingLeft: paddingHorizontal,
    paddingRight: paddingHorizontal,
    paddingTop: paddingVertical,
    paddingBottom: paddingVertical,
    justifyItems,
    alignItems,
    width,
    height,
    borderRadius,
    ...colorStyle,
  };

  return (
    <div className={styles["card"]} style={style}>
      {children}
    </div>
  );
}