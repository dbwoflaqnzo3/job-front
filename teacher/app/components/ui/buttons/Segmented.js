"use client";
import { useState, cloneElement } from "react";
import styles from "./segmented.module.css";

export function SegmentedButton({ label, name, value, checked, onChange }) {
  return (
    <label className={`${styles["segmented-button"]} ${checked ? styles["active"] : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles["segmented-label"]}>{label}</span>  

    </label>
  );
}

export function SegmentedGroup({ name, children, defaultValue, onChange }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  const clonedChildren = children.map((child) =>
    cloneElement(child, {
      name,
      checked: selectedValue === child.props.value,
      onChange: handleChange,
    })
  );

  return <div className={styles["segmented-container"]}>{clonedChildren}</div>;  

}