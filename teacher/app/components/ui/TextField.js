"use client";
import { useState } from "react";
import styles from "./textField.module.css";
import { Column } from "@/app/widgets/structure/Grid";
import EyeOpenIcon from '@/public/assets/images/icons/eyeOpen.svg';
import EyeCloseIcon from '@/public/assets/images/icons/eyeClose.svg';

export default function TextField({ 
  placeholder,
  type = "text",
  onChange,
  validate,
  value,
  width = 200,
  stretch = false,
  showMismatchOnly = false,
  validators = [],
}) {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(true);
  const [inputType, setInputType] = useState(type);
  const [isObscured, setIsObscured] = useState(true);

  if (showMismatchOnly) {
    validators = validators.sort((a, b) => {
      return a.isMatch(inputValue) - b.isMatch(inputValue);
    });
  }

  const handleInputChange = (event) => {
    const value = event.target.value.replaceAll(" ", "");
    event.target.value = value;
    setHasError(validators.some((validator) => !validator.isMatch(value)));
    if (validate) validate(!hasError);
    setInputValue(value);
    if (onChange) onChange(value);
  };

  width = stretch ? "100%" : width;

  const fieldName = `${styles["text-field"]} ko-md-15 ${inputValue !== "" && hasError ? styles["error"] : ""}`;
  const matchedText = showMismatchOnly ? "void" : "matched";

  const getGuideName = (validator) => {
    const className = `${styles["guide"]} ko-md-13 `;
    if (inputValue === "") return className + styles[showMismatchOnly ? "void" : ""];
    return className + styles[validator.isMatch(inputValue) ? matchedText : "error"];
  };

  const onPaste = (event) => {
    if (inputType !== "password") return;
    event.preventDefault();
    return false;
  };

  const toggleObscured = () => {
    if (type === "password") setInputType(isObscured ? "password" : "text");
    setIsObscured(!isObscured);
  };

  const eyeIcon = () => {
    const size = 20;
    if (type !== "password") return null;
    return <div className={styles["eye-icon"]} onClick={toggleObscured}>
      {isObscured ? <EyeOpenIcon width={size} height={size} /> : <EyeCloseIcon width={size} height={size} />}
    </div>;
  }

  return (
    <div style={{ width }}>
      <div className={styles["text-field-container"]}>
        <input
          className={fieldName}
          type={inputType}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={value}
          style={{ width }}
          onPaste={onPaste}
        />
        {eyeIcon()}
      </div>
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
