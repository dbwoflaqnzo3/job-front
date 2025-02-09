'use client'
import { useState, cloneElement } from "react";
import { Row } from "../widgets/structure/Grid";
import "./segmentedButton.css";

export function SegmentedButton({ label, name, value, checked, onChange }) {
  return (
    <label className={`segmented-button ${checked ? "active" : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="segmented-label">{label}</span>
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

  return <div className="segmented-container">{clonedChildren}</div>;
}