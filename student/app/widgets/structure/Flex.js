import React, { Children } from "react";
import styles from "./grid.module.css";

export function RowFlex({ 
  children, 
  ratios = [], 
  gap = "10px",
  alignCell = "center",
}) {
  const childrenArray = Children.toArray(children);
  const appliedRatios = ratios.length === childrenArray.length 
    ? ratios 
    : new Array(childrenArray.length).fill(1);
  const ratioSum = appliedRatios.reduce((a, b) => a + b, 0);

  return (
    <div className={styles["row-flex"]} style={{ 
      display: "flex",
      flexDirection: "row",
      gap,
      width: "100%",
    }}>
      {childrenArray.map((child, index) => (
        <div key={index} style={{
          flexGrow: appliedRatios[index],
          flexBasis: `${(appliedRatios[index] / ratioSum) * 100}%`,
          display: "flex",
          justifyContent: alignCell,
          alignItems: "center",
          minWidth: 0,
        }}>
          {child}
        </div>
      ))}
    </div>
  );
}

export function ColumnFlex({ 
  children, 
  ratios = [], 
  gap = "10px",
  alignCell = "center",
}) {
  const childrenArray = Children.toArray(children);
  const appliedRatios = ratios.length === childrenArray.length 
    ? ratios 
    : new Array(childrenArray.length).fill(1);
  const ratioSum = appliedRatios.reduce((a, b) => a + b, 0);

  return (
    <div className={styles["column-flex"]} style={{ 
      display: "flex",
      flexDirection: "column",
      gap,
      height: "100%",
    }}>
      {childrenArray.map((child, index) => (
        <div key={index} style={{
          flexGrow: appliedRatios[index],
          flexBasis: `${(appliedRatios[index] / ratioSum) * 100}%`,
          display: "flex",
          justifyContent: alignCell,
          alignItems: "center",
          minHeight: 0,
        }}>
          {child}
        </div>
      ))}
    </div>
  );
}