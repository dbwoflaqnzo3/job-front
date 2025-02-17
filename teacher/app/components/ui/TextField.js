"use client";
import { useState } from "react";
import styles from "./textField.module.css";
import { Column } from "@/app/widgets/structure/Grid";

export default function TextField({ 
  placeholder,
  type = "text",
  onChange,
  value,
  width = 200,
  stretch = false,
  showMismatchOnly = false,
  validators = [],
}) {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  if (showMismatchOnly) {
    validators = validators.sort((a, b) => {
      return a.isMatch(inputValue) - b.isMatch(inputValue);
    });
  }

  const handleInputChange = (event) => {
    const value = event.target.value.replaceAll(" ", "");
    event.target.value = value;
    setHasError(validators.some((validator) => !validator.isMatch(value)));
    setInputValue(value);
    if (onChange) onChange(value);

  };

  width = stretch ? "100%" : width;

  const fieldName = `${styles["text-field"]} ko-md-15 ${hasError ? styles["error"] : ""}`;
  const matchedText = showMismatchOnly ? "void" : "matched";

  const getGuideName = (validator) => {
    const className = `${styles["guide"]} ko-md-13 `;
    if (inputValue === "") return className + styles[showMismatchOnly ? "void" : ""];
    return className + styles[validator.isMatch(inputValue) ? matchedText : "error"];
  };

  const onPaste = (event) => {
    if (type !== "password") return;
    event.preventDefault();
    return false;
  }

  return (
    <div style={{ width }}>
      <input
        className={fieldName}
        type={type} 
        placeholder={placeholder} 
        onChange={handleInputChange}
        value={value}
        style={{ width }}
        onPaste={onPaste}
      />
      <Column gap={0}>
        {validators.map((validator, index) => (
          <div 
            key={index} 
            className={getGuideName(validator)}
            style={{ marginLeft: showMismatchOnly ? 0 : 20 }}
          >{validator.guide}</div>
        ))}
      </Column>
    </div>
  );
}
