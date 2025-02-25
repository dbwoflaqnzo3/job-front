"use client";
import { useState, useEffect } from "react";
import styles from "./textField.module.css";
import { Column } from "@/app/widgets/structure/Grid";
import EyeOpenIcon from '@/public/assets/images/icons/eyeOpen.svg';
import EyeCloseIcon from '@/public/assets/images/icons/eyeClose.svg';

export default function TextField({ 
  placeholder,
  type = "text",
  onChange,
  validate,
  value = "",
  width = 200,
  stretch = false,
  allowSpace = true,
  showMismatchOnly = false,
  disabled = false,
  validators = [],
}) {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(true);
  const [inputType, setInputType] = useState(type);
  const [isObscured, setIsObscured] = useState(true);

  useEffect(() => setInputValue(value), [value]);
  
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
    if (type === "password" && !disabled) setInputType(isObscured ? "password" : "text");
    setIsObscured(!isObscured);
  };

  const eyeIcon = () => {
    const size = 20;
    if (type !== "password" || disabled) return null;
    return <div className={styles["eye-icon"]} onClick={toggleObscured}>
      {isObscured ? <EyeOpenIcon width={size} height={size} /> : <EyeCloseIcon width={size} height={size} />}
    </div>;
  };

  return (
    <div style={{ width }}>
      <div className={styles["text-field-container"]}>
        <input
          className={fieldName}
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
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

// "use client";
// import { useState } from "react";
// import styles from "./textField.module.css";
// import { Column } from "@/app/widgets/structure/Grid";
// import EyeOpenIcon from '@/public/assets/images/icons/eyeOpen.svg';
// import EyeCloseIcon from '@/public/assets/images/icons/eyeClose.svg';

// export default function TextField({ 
//   placeholder,
//   type = "text",
//   onChange,
//   validate,
//   value,
//   width = 200,
//   stretch = false,
//   allowSpace = true,
//   showMismatchOnly = false,
//   disabled = false,
//   validators = [],
// }) {
//   const [inputValue, setInputValue] = useState("");
//   const [hasError, setHasError] = useState(true);
//   const [inputType, setInputType] = useState(type);
//   const [isObscured, setIsObscured] = useState(true);

//   if (showMismatchOnly) {
//     validators = validators.sort((a, b) => {
//       return a.isMatch(inputValue) - b.isMatch(inputValue);
//     });
//   }

//   const handleInputChange = (event) => {
//     if (disabled) return;
//     let value = event.target.value
//     if (!allowSpace) value = value.replaceAll(" ", "");
//     event.target.value = value;
//     setHasError(validators.some((validator) => !validator.isMatch(value)));
//     if (validate) validate(!hasError);
//     setInputValue(value);
//     if (onChange) onChange(value);
//   };

//   width = stretch ? "100%" : width;

//   const fieldName = `${styles["text-field"]} ko-md-15 ${inputValue !== "" && hasError ? styles["error"] : ""} ${disabled ? styles["disabled"] : ""}`;
//   const matchedText = showMismatchOnly ? "void" : "matched";

//   const getGuideName = (validator) => {
//     const className = `${styles["guide"]} ko-md-13 `;
//     if (inputValue === "") return className + styles[showMismatchOnly ? "void" : ""];
//     return className + styles[validator.isMatch(inputValue) ? matchedText : "error"];
//   };

//   const onPaste = (event) => {
//     if (inputType !== "password" || disabled) return;
//     event.preventDefault();
//     return false;
//   };

//   const toggleObscured = () => {
//     if (type === "password" && !disabled) setInputType(isObscured ? "password" : "text");
//     setIsObscured(!isObscured);
//   };

//   const eyeIcon = () => {
//     const size = 20;
//     if (type !== "password" || disabled) return null;
//     return <div className={styles["eye-icon"]} onClick={toggleObscured}>
//       {isObscured ? <EyeOpenIcon width={size} height={size} /> : <EyeCloseIcon width={size} height={size} />}
//     </div>;
//   };

//   return (
//     <div style={{ width }}>
//       <div className={styles["text-field-container"]}>
//         <input
//           className={fieldName}
//           type={inputType}
//           placeholder={placeholder}
//           onChange={handleInputChange}
//           value={value}
//           style={{ width }}
//           onPaste={onPaste}
//           disabled={disabled}
//         />
//         {eyeIcon()}
//       </div>
//       <Column gap={0}>
//         {validators.map((validator, index) => (
//           <div 
//             key={index} 
//             className={getGuideName(validator)}
//             style={{ marginLeft: showMismatchOnly ? 0 : 20 }}
//           >{validator.guide}</div>
//         ))}
//       </Column>
//     </div>
//   );
// }

