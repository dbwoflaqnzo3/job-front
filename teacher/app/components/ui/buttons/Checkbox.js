"use client";
import React, { useState, cloneElement } from "react";
import styles from "./checkbox.module.css";  

export function CheckboxButton({ label, name, value, checked, onChange, entire = false }) {
  return (
    <label className={styles["checkbox-button"]}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={`${styles["checkbox-box"]} ${entire ? styles["entire-checkbox"] : ""}`}></span>
      
      <span className={`${styles["checkbox-button-label"]} ko-reg-17`}>{label}</span>
    </label>
  );
}

export function CheckboxGroup({ name, children }) {
  const allCheckboxes = findAllCheckboxButtons(React.Children.toArray(children));

  const [checkedValues, setCheckedValues] = useState(
    allCheckboxes.reduce((acc, child) => {
      if (!child.props.entire) acc[child.props.value] = false;
      return acc;
    }, {})
  );

  const allValues = Object.keys(checkedValues);
  const isAllChecked = allValues.length > 0 && allValues.every(value => checkedValues[value]);

  const handleChange = (value, entire) => {
    if (entire) {
      const newCheckedState = !isAllChecked;
      const newCheckedValues = allValues.reduce((acc, val) => {
        acc[val] = newCheckedState;
        return acc;
      }, {});
      setCheckedValues(newCheckedValues);
    } else {
      setCheckedValues(prev => {
        const updatedValues = { ...prev, [value]: !prev[value] };
        const areAllChecked = allValues.every(val => updatedValues[val]);
        return updatedValues;
      });
    }
  };

  function updateChildCheckbox(child) {
    if (!React.isValidElement(child)) return child;

    if (child.type === CheckboxButton) {
      return cloneElement(child, {
        name,
        checked: child.props.entire ? isAllChecked : !!checkedValues[child.props.value],
        onChange: () => handleChange(child.props.value, child.props.entire),
      });
    }

    if (child.props.children) {
      return cloneElement(child, {
        children: React.Children.map(child.props.children, updateChildCheckbox),
      });
    }

    return child;
  }

  return <div className={styles["checkbox-group"]}>{React.Children.map(children, updateChildCheckbox)}</div>;
}


function findAllCheckboxButtons(children) {
  let foundCheckboxes = [];

  React.Children.forEach(children, (child) => {
    if (!child) return;

    if (child.type === CheckboxButton) {
      foundCheckboxes.push(child);
    }

    if (child.props?.children) {
      foundCheckboxes = foundCheckboxes.concat(
        findAllCheckboxButtons(React.Children.toArray(child.props.children))
      );
    }
  });

  return foundCheckboxes;
}