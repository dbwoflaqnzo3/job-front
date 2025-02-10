"use client";
import { useState, cloneElement, Children } from "react";
import styles from "./segmented.module.css";

export function SegmentedButton({ label, name, value, checked, onChange, flexGrow }) {
  return (
    <label 
      className={`${styles["segmented-button"]} ${checked ? styles["active"] : ""}`}
      style={{ flexGrow }} // ✅ `flexGrow` 값 적용
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

  // ✅ `children` 개수를 기반으로 기본 `ratios` 설정
  const totalChildren = Children.count(children);
  const defaultRatios = new Array(totalChildren).fill(1); // ✅ 기본적으로 모두 `1`

  // ✅ `ratios`가 없거나 길이가 다를 경우 기본값 사용
  const validRatios = ratios.length === totalChildren ? ratios : defaultRatios;

  // ✅ 각 버튼에 `flexGrow` 값을 전달
  const segmentedChildren = Children.map(children, (child, index) =>
    cloneElement(child, {
      name,
      checked: selectedValue === child.props.value,
      onChange: handleChange,
      flexGrow: validRatios[index], // ✅ `flexGrow` 값 적용
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