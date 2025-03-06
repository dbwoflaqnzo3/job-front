"use client";
import { useState, cloneElement } from "react";
import { Grid } from "@/app/widgets/structure/Grid";
import styles from "./radio.module.css";

export function RadioButton({ theme, label, name, value, checked, onChange }) {
  const style = {"--color": `var(--${theme}-500)`};

  return (
    <label className={styles["radio-button"]} style={style}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles["radio-circle"]}></span>
      
      <span className={`${styles["radio-button-label"]} ko-reg-17`}>{label}</span>
    </label>
  );
}

export function RadioGroup({ 
  theme = "primary",
  name, 
  children, 
  defaultValue, 
  onChange, 
  row, 
  column,
  gap,
}) {
  

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  const clonedChildren = children.map((child, index) =>
    cloneElement(child, {
      key: child.key || index,
      theme: child.props.theme || theme,
      name,
      checked: selectedValue === child.props.value,
      onChange: handleChange,
    })
  );

  return <Grid row={row} column={column} gap={gap}>{clonedChildren}</Grid>;
}