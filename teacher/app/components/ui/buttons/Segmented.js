"use client";
import { useState, cloneElement, Children } from "react";
import styles from "./segmented.module.css";

export function SegmentedButton({ 
  theme, 
  label, 
  name, 
  value, 
  checked, 
  onChange, 
  flexGrow, 
  type,
}) {
  const className = `${styles["segmented-button"]} ${checked ? styles["active"] : ""} ${styles[type]} ${styles[theme]}`;

  return (
    <label
      className={className}
      style={{ flexGrow }}
    >
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

export function SegmentedGroup({ 
  theme = "primary",
  name, 
  children, 
  defaultValue, 
  onChange, 
  width = 600,
  stretch = false,
  ratios = [],
  type,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  const totalChildren = Children.count(children);
  const defaultRatios = new Array(totalChildren).fill(1);
  const validRatios = ratios.length === totalChildren ? ratios : defaultRatios;

  const segmentedChildren = Children.map(children, (child, index) =>
    cloneElement(child, {
      name,
      theme: child.props.theme || theme,
      checked: selectedValue === child.props.value,
      onChange: handleChange,
      flexGrow: validRatios[index],
      type: type,
    })
  );

  width = stretch ? "100%" : width;

  return (
    <div 
      className={`${styles["segmented-container"]} ${styles[type]} ${styles[theme]}`} 
      style={{width}}
    >
      {segmentedChildren}
    </div>
  );
}

export function SegmentedGroup1(props) {
  return <SegmentedGroup {...props} type="button1">{props.children}</SegmentedGroup>;
};
export function SegmentedGroup2(props) {
  return <SegmentedGroup {...props} type="button2">{props.children}</SegmentedGroup>;
};