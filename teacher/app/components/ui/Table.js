"use client";
import React, { useState, cloneElement } from "react";
import styles from "./table.module.css";

export function TableBody({ 
  children,
  textStyles = [],
  columnRatios = [],
  rowPaddingVertical = 22,
  onSelect,
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const columns = children[0].length;
  const defaultTextStyles = new Array(columns).fill("ko-md-17");
  textStyles = textStyles.length === columns ? textStyles : defaultTextStyles;

  const style = (index) => { return {
    paddingTop: rowPaddingVertical,
    paddingBottom: rowPaddingVertical,
    width: `${(columnRatios[index] / columnRatios.reduce((a, b) => a + b, 0)) * 100}%`
  }};

  const handleRowClick = (index) => {
    setSelectedIndex(index); 
    if (onSelect) onSelect(index);
  };

  return (
    <tbody>
      {children.map((row, rowIndex) => (
        <tr 
          key={rowIndex}
          className={rowIndex === selectedIndex ? styles["selected"] : ""}
          onClick={() => handleRowClick(rowIndex)}
        >
          {row.map((cell, cellIndex) => (
            <td 
              className={textStyles[cellIndex]} 
              key={cellIndex} 
              style={style(cellIndex)}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function TableHeader({ 
  children, 
  textStyles = [], 
  columnRatios = [],
  paddingVertical = 16,
}) {
  const columns = children.length;
  const defaultTextStyles = new Array(columns).fill("ko-sb-20");
  textStyles = textStyles.length === columns ? textStyles : defaultTextStyles;
  
  const style = (index) => { return {
    paddingTop: paddingVertical,
    paddingBottom: paddingVertical,
    width: `${(columnRatios[index] / columnRatios.reduce((a, b) => a + b, 0)) * 100}%`
  }};

  return (
    <thead>
      <tr className={styles["header"]}>
        {children.map((title, index) => (
          <th
            key={index}
            className={`${textStyles[index]}`}
            style={style(index)}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function Table({ 
  theme = "primary",
  width = "100%", 
  height = "auto", 
  children,
  columnRatios = [],
  paddingLeft = 10,
  paddingRight = 10,
}) {
  const tableHeader = React.Children.toArray(children)
    .find((child) => child.type === TableHeader);
  const columns = tableHeader ? React.Children
    .count(tableHeader.props.children) : 0;
  const defaultRatios = new Array(columns).fill(0);
  columnRatios = columnRatios.length === columns ? columnRatios : defaultRatios;

  let background = "";
  if (theme === "primary") background = "student";
  else if (theme === "secondary") background = "teacher";

  const style = {
    "--border-color": `var(--${theme}-300)`,
    "--header-color": `var(--${theme}-200)`,
    "--row-color": `var(--black-100)`,
    "--clicked-color": `var(--background-${background})`,
    "--padding-left": `${paddingLeft}px`,
    "--padding-right": `${paddingRight}px`,
    width, height,
    maxHeight: height,
  };

  children = React.Children.toArray(children).map((child) =>
    React.cloneElement(child, {
      ...child.props,
      columnRatios: columnRatios,
    })
  );

  return (
    <div className={styles["table-container"]} style={style}>
      <table className={styles.table}>{children}</table>
      <div className={styles["scroll-gradient"]}></div>
    </div>
  );
}