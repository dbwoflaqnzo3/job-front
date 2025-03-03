"use client";
import { useState, useEffect } from "react";
import styles from "./textField.module.css";
import { Column } from "@/app/widgets/structure/Grid";
import EyeOpenIcon from '@/public/assets/images/icons/eyeOpen.svg';
import EyeCloseIcon from '@/public/assets/images/icons/eyeClose.svg';

export default function TextField({ 
  theme = "primary",
  placeholder,
  type = "text",
  onChange,
  onBlur,
  validate,
  value = "",
  width = 200,
  stretch = false,
  allowSpace = true,
  showMismatchOnly = false,
  disabled = false,
  validators = [],
}) {
  const [inputValue, setInputValue] = useState(value);
  const [hasError, setHasError] = useState(true);
  const [inputType, setInputType] = useState(type);
  const [isObscured, setIsObscured] = useState(type === "password");

  useEffect(() => setInputValue(value), [value]);

  const style = {
    "--border-color": `var(--${theme}-300)`,
    "--foreground-color": `var(--${theme}-500)`,
    "--background-color": `var(--${theme}-100)`,
  };

  if (showMismatchOnly) {
    validators = validators.sort((a, b) => {
      return a.isMatch(inputValue) - b.isMatch(inputValue);
    });
  }

  const formatPhoneNumber = (value, isBackspace) => {
    let numericValue = value.replace(/\D/g, "").slice(0, 8); 

    if (isBackspace && numericValue.length < inputValue.replace(/\D/g, "").length) {
      numericValue = numericValue.slice(0, -1);
    }

    if (numericValue.length >= 7) {
      return `${numericValue.slice(0, numericValue.length - 4)}-${numericValue.slice(-4)}`;
    } else if (numericValue.length >= 4) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    }
    return numericValue;
  };

  const handleInputChange = (event) => {
    if (disabled) return;
    let value = event.target.value;

    if (type === "tel") {
      value = formatPhoneNumber(value, false);
    } else if (!allowSpace) {
      value = value.replaceAll(" ", "");
    }

    setHasError(validators.some((validator) => !validator.isMatch(value)));
    if (validate) validate(!hasError);
    setInputValue(value);
    if (onChange) onChange(value);
  };

  const handleKeyDown = (event) => {
    if (type === "tel") {
      if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
      if (event.key === "Backspace") {
        setInputValue(formatPhoneNumber(inputValue, true));
      }
    }
  };

  width = stretch ? "100%" : width;

  const fieldName = `${styles["text-field"]} ko-md-15 ${inputValue !== "" && hasError ? styles["error"] : ""} ${disabled ? styles["disabled"] : ""}`;
  const matchedText = showMismatchOnly ? "void" : "matched";

  const getGuideName = (validator) => {
    const className = `${styles["guide"]} ko-md-13 `;
    if (inputValue === "") return className + styles[showMismatchOnly ? "void" : ""];
    return className + styles[validator.isMatch(inputValue) ? matchedText : "error"];
  };

  const onPaste = (event) => {
    if (inputType !== "password" || disabled) return;
    event.preventDefault();
    return false;
  };

  const toggleObscured = () => {
    if (type === "password" && !disabled) {
      setIsObscured(!isObscured);
      setInputType(isObscured ? "text" : "password");
    }
  };

  const eyeIcon = () => {
    const size = 20;
    if (type !== "password" || disabled) return null;
    return (
      <div className={styles["eye-icon"]} onClick={toggleObscured}>
        {isObscured ? <EyeOpenIcon width={size} height={size} /> : <EyeCloseIcon width={size} height={size} />}
      </div>
    );
  };

  return (
    <div style={{ width }}>
      <div className={styles["text-field-container"]} style={style}>
        <input
          className={fieldName}
          type={inputType}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          value={inputValue}
          style={{ width }}
          onPaste={onPaste}
          disabled={disabled}
        />
        {eyeIcon()}
      </div>
      <Column gap={0}>
        {validators.map((validator, index) => (
          <div key={index} className={getGuideName(validator)}>{validator.guide}</div>
        ))}
      </Column>
    </div>
  );
}