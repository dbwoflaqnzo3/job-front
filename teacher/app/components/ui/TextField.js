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
  validators = [],
}) {
  const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    
    if (onChange) {
      onChange(event);
    }

    // 검증 실행
    const failedMessages = validators
      .filter((validator) => !validator.isMatch(inputValue))
      .map((validator) => validator.getGuide());
    
    setErrorMessages(failedMessages);
  };

  width = stretch ? "100%" : width;

  return (
    <div style={{ width }}>
      <input
        className={`${styles["text-field"]} ko-md-15 ${errorMessages.length > 0 ? styles["error"] : ""}`}
        type={type} 
        placeholder={placeholder} 
        onChange={handleInputChange}
        value={value}
        style={{ width }}
      />
      {errorMessages.length > 0 && (
        <Column gap={0}>
          {errorMessages.map((msg, index) => (
            <div key={index} className={`${styles["error-message"]} ko-reg-13`}>{msg}</div>
          ))}
        </Column>
      )}
    </div>
  );
}
