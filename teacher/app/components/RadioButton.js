'use client'
import { useState, cloneElement } from "react";
import { Grid } from "../widgets/structure/Grid";
import "./radioButton.css";

export function RadioButton({ label, name, value, checked, onChange }) {
  return (
    <label className="radio-button">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="radio-circle"></span>
      <span className="radio-button-label ko-reg-17">{label}</span>
    </label>
  );
}

export function RadioGroup({ name, children, defaultValue, onChange, row, column }) {
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

  return <Grid row={row} column={column}>{clonedChildren}</Grid>;
}