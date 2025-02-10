"use client";
import styles from "./textField.module.css";

export default function TextField({ 
  placeholder,
  type = "text",
  onChange,
  value,
  width = 200,
  stretch = false,
  error = false,
}) {
  
  width = stretch ? "100%" : width;

  return (
    <input 
      className={`${styles["text-field"]} ko-md-15 ${error ? styles["error"] : ""}`}
      type={type} 
      placeholder={placeholder} 
      onChange={onChange}
      value={value}
      style={{width}}
    />
  );
}