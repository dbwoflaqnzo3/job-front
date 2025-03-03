import React, { cloneElement } from "react";
import styles from "./stepIndicator.module.css";

export function StepElement({ 
  theme,
  label, 
  index, 
  isActive, 
  isCompleted,
}) {
  return (
    <div className={`${styles["step"]} ${isActive ? styles["active"] : ""} ${isCompleted ? styles["completed"] : ""} ${styles[theme]}`}>
      <div className={`${styles["index"]} en-md-17`}>{index}</div>
      <span className={`${styles["label"]} ko-md-17`}>{label}</span>
    </div>
  );
}

export function StepIndicator({ 
  theme = "primary", 
  children, 
  currentStep = 1,
}) {
  const steps = React.Children.toArray(children);

  return (
    <div className={styles["step-container"]}>
      {steps.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className={`${styles["step-line"]} ${index + 1 <= currentStep ? styles["active"] : ""}`} />
          )}
          {cloneElement(child, {
            index: index + 1,
            theme: child.props.theme || theme,
            isActive: index + 1 === currentStep,
            isCompleted: index + 1 < currentStep,
          })}
        </React.Fragment>
      ))}
    </div>
  );
}