"use client";
import styles from "./textField.module.css";

export default function TextField({ 
  placeholder,
  type = "text",
  state = "default",
  onChange,
  value,
  width = 200,
  stretch = false,
}) {
  
  width = stretch ? "100%" : width;

  return (
    <input 
      className={`${styles["text-field"]} ko-md-15 ${styles[state] || ""}`}
      type={type} 
      placeholder={placeholder} 
      onChange={onChange}
      value={value}
      style={{width}}
    />
  );
}