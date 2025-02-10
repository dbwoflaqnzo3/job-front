"use client";
import { useState, cloneElement, Children } from "react";
import styles from "./segmented.module.css";

export function SegmentedButton({ label, name, value, checked, onChange, flexGrow }) {
  return (
    <label 
      className={`${styles["segmented-button"]} ${checked ? styles["active"] : ""}`}
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
  name, 
  children, 
  defaultValue, 
  onChange, 
  width = 600,
  stretch = false,
  ratios = []
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
      checked: selectedValue === child.props.value,
      onChange: handleChange,
      flexGrow: validRatios[index],
    })
  );

  width = stretch ? "100%" : width;

  return (
    <div 
      className={styles["segmented-container"]} 
      style={{width}}
    >
      {segmentedChildren}
    </div>
  );
}

// "use client";
// import { useState, cloneElement } from "react";
// import styles from "./segmented.module.css";

// export function SegmentedButton({ label, name, value, checked, onChange }) {
//   return (
//     <label className={`${styles["segmented-button"]} ${checked ? styles["active"] : ""}`}>
//       <input
//         type="radio"
//         name={name}
//         value={value}
//         checked={checked}
//         onChange={onChange}
//       />
//       <span className={styles["segmented-label"]}>{label}</span>  

//     </label>
//   );
// }

// export function SegmentedGroup({ name, children, defaultValue, onChange }) {
//   const [selectedValue, setSelectedValue] = useState(defaultValue);

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//     if (onChange) onChange(event.target.value);
//   };

//   const clonedChildren = children.map((child) =>
//     cloneElement(child, {
//       name,
//       checked: selectedValue === child.props.value,
//       onChange: handleChange,
//     })
//   );

//   return <div className={styles["segmented-container"]}>{clonedChildren}</div>;  

// }