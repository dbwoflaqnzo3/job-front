"use client";
import React, { useState } from "react";
import styles from "./table.module.css";

class TableEntity {
  constructor(fields, values) {
    this.fields = fields;
    this.values = values;
  }

  static fromObjects(objects) {
    if (!objects || objects.length === 0) return new TableEntity([], []);
    const fields = Object.keys(objects[0]);
    const values = objects.map((obj) => fields.map((field) => obj[field] ?? ""));
    return new TableEntity(fields, values);
  }
}

export function TableExpandableBody(props, {
  hiddenData
}) {
  return (
    <>
      <TableBody {...props}>{props.children}</TableBody>
      <div></div>
    </>
  );
}

export function TableBody({ 
  children,
  textStyles = [],
  columnRatios = [],
  paddingLeft,
  paddingRight,
  gap,
  ratioSum,
  rowPaddingVertical = 22,
  onSelect,
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const columns = children[0].length;
  const defaultTextStyles = new Array(columns).fill("ko-md-17");
  textStyles = textStyles.length === columns ? textStyles : defaultTextStyles;

  const style = (index) => { 
    let width = columnRatios[index];

    if (index === 0) width += paddingLeft + gap * .5;
    else if (index === columns - 1) width += paddingRight + gap * .5;
    else width += gap;

    return {
      paddingTop: rowPaddingVertical,
      paddingBottom: rowPaddingVertical,
      width: `${(width / ratioSum) * 100}%`
    };
  };

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
  paddingLeft,
  paddingRight,
  gap,
  ratioSum,
  paddingVertical = 16,
}) {
  const columns = children.length;
  const defaultTextStyles = new Array(columns).fill("ko-sb-20");
  textStyles = textStyles.length === columns ? textStyles : defaultTextStyles;
  
  const style = (index) => { 
    let width = columnRatios[index];

    if (index === 0) width += paddingLeft + gap * .5;
    else if (index === columns - 1) width += paddingRight + gap * .5;
    else width += gap;

    return {
      paddingTop: paddingVertical,
      paddingBottom: paddingVertical,
      width: `${(width / ratioSum) * 100}%`
    };
  };

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
  columnGap = 40,
  paddingLeft = 10,
  paddingRight = 10,
}) {
  const tableHeader = React.Children.toArray(children)
    .find((child) => child.type === TableHeader);
  const columns = tableHeader ? React.Children
    .count(tableHeader.props.children) : 0;
    
    const defaultRatios = new Array(columns).fill(0);
    columnRatios = columnRatios.length === columns ? columnRatios : defaultRatios;
    console.log('#', columnRatios, columns);

  const modifiedRatios = columnRatios.flatMap((ratio, index) =>
    index < columnRatios.length - 1 ? [ratio, columnGap] : [ratio]
  );
  console.log('@', modifiedRatios);
  const ratios = [paddingLeft, ...modifiedRatios, paddingRight];
  const ratioSum = ratios.reduce((a, b) => a + b, 0);
  console.log(ratios, ratioSum);

  let background = "";
  if (theme === "primary") background = "student";
  else if (theme === "secondary") background = "teacher";

  const style = {
    "--border-color": `var(--${theme}-300)`,
    "--header-color": `var(--${theme}-200)`,
    "--row-color": `var(--black-100)`,
    "--clicked-color": `var(--background-${background})`,
    "--padding-left": `${paddingLeft / ratioSum * 100}%`,
    "--padding-right": `${paddingRight / ratioSum * 100}%`,
    "--column-gap": `${columnGap / ratioSum * 100}%`,
    width, height,
    maxHeight: height,
  };

  children = React.Children.toArray(children).map((child) =>
    React.cloneElement(child, {
      ...child.props,
      columnRatios: columnRatios,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      gap: columnGap,
      ratioSum: ratioSum,
    })
  );

  return (
    <div className={styles["table-container"]} style={style}>
      <table className={styles.table}>{children}</table>
      <div className={styles["scroll-gradient"]}></div>
    </div>
  );
}