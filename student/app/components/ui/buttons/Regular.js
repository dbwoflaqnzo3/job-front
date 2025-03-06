"use client";
import { useMemo } from "react";
import styles from "./regular.module.css";
import { Row } from "@/app/widgets/structure/Grid";
import DynamicIcon from "@/app/components/ui/image/DynamicIcon";

export default function Button({ 
  theme = "primary",
  text,
  type,
  disabled = false,
  icon = null,
  onClick,
  stretch = false,
  width = 200,
  shrink = false,
}) {
  width = stretch ? "100%" : width;
  const padding = shrink ? 0 : 13.5;

  let textStyle = "ko-sb-18";
  if (type === "text") textStyle = "ko-md-15";

  return (
    <button 
      className={`${styles["button"]} ${textStyle} ${styles[type]} ${disabled ? styles["disabled"] : ""} ${styles[theme]}`}
      style={{width, padding}}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <div className={styles["button-children"]}>
        <Row>{icon && <DynamicIcon icon={icon} size={34} />}{text}</Row>
      </div>
    </button>
  );
}

export const Button1 = (props) => <Button {...props} type="button1" />;
export const Button2 = (props) => <Button {...props} type="button2" />;
export const Button3 = (props) => <Button {...props} type="button3" />;
export const Button4 = (props) => <Button {...props} type="button4" />;
export const Button5 = (props) => <Button {...props} type="button5" icon="search" />;
export const Button6 = (props) => <Button {...props} type="button6" />;

export const TextButton = (props) => <Button {...props} type="text" shrink stretch />;