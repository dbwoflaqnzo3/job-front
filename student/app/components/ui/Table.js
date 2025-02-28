"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { Column } from "@/app/widgets/structure/Grid";
import DynamicIcon from "@/app/components/ui/image/DynamicIcon";

export const FieldState = Object.freeze({
    VISIBLE: "표시",
    HIDDEN: "숨김",
    DISABLED: "사용하지 않음"
});

export class TableEntity {
    constructor(data) {
        if (!Array.isArray(data) || data.length === 0) {
            this.header = [];
            this.rows = [];
            this.states = {};
            return;
        }

        const fieldMappings = data[0].constructor.fieldMappings || {};
        this.header = Object.keys(fieldMappings).map((key) => ({
            key,
            label: fieldMappings[key],
        }));

        this.states = data[0].constructor.states || {};
        this.rows = data.map((item) =>
            this.header.map(({ key }) => this.formatValue(key, item[key]))
        );
    }

    isPriceField(key) {
        return ["비", "price", "amount", "cost"].some((field) => key.toLowerCase().includes(field));
    }

    formatValue(key, value) {
        if (this.isPriceField(key) && typeof value === "number") {
            return `₩ ${value.toLocaleString("ko-KR")}`;
        }

        if (value instanceof Date || (!isNaN(Date.parse(value)) && typeof value !== "string")) {
            const date = new Date(value);
            const year = date.getFullYear() % 100;
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}/${month}/${day}`;
        }

        if (typeof value === "object" && value !== null) {
            return Object.entries(value)
                .map(([k, v]) => `${k}: ${this.formatValue(k, v)}`)
                .join("\n");
        }

        return value ?? "N/A";
    }

    getVisibleHeaders() {
        return this.header
            .filter(({ key }) => this.states[key] === FieldState.VISIBLE)
            .map(({ label }) => label);
    }

    getHeadersWithHidden() {
        return this.header
            .filter(({ key }) => this.states[key] !== FieldState.DISABLED)
            .map(({ label }) => label);
    }

    getVisibleRows() {
        const visibleKeys = this.header
            .filter(({ key }) => this.states[key] === FieldState.VISIBLE)
            .map(({ key }) => key);

        return this.rows.map((row) =>
            row.filter((_, index) => visibleKeys.includes(this.header[index].key))
        );
    }

    getRowsWithHidden() {
        const validKeys = this.header
            .filter(({ key }) => this.states[key] !== FieldState.DISABLED)
            .map(({ key }) => key);

        return this.rows.map((row) =>
            row.filter((_, index) => validKeys.includes(this.header[index].key))
        );
    }
}

export function TableExpandableBody({
    children,
    rowPaddingVertical = 22,
    textStyles,
}) {
    const entity = new TableEntity(children);
    const rows = entity.getVisibleRows();
    const rowsWithHidden = entity.getRowsWithHidden();
    const headers = [...entity.getVisibleHeaders(), " "];
    const headersWithHidden = entity.getHeadersWithHidden();
    const columns = headers.length;

    const defaultTextStyles = new Array(columns).fill("ko-md-17");
    textStyles = textStyles ?? defaultTextStyles;

    const style = {
        paddingTop: rowPaddingVertical,
        paddingBottom: rowPaddingVertical,
    };

    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (index) => {
        setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <tbody>
            {rows.map((row, rowIndex) => {
                const isExpanded = expandedRows[rowIndex];
                return (
                    <React.Fragment key={rowIndex}>
                        <tr
                            className={`${styles["expandable-row"]} ${isExpanded ? styles["expanded"] : styles["hidden"]}`}
                            onClick={() => toggleRow(rowIndex)}
                        >
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={style} className={textStyles[cellIndex]}>
                                    {cell}
                                </td>
                            ))}
                            <td className={styles["arrow-container"]}>
                                <div className={`${styles["arrow-icon"]} ${isExpanded ? styles["rotated"] : ""}`}>
                                    <DynamicIcon icon="arrowDown" size={24} />
                                </div>
                            </td>
                        </tr>
                        <tr className={`${styles["hidden-row"]} ${isExpanded ? styles["show"] : ""} ko-reg-17`}>
                            <td colSpan={headers.length}>
                                <div className={styles["hidden-content"]}>
                                    <Column gap={24}>
                                        {rowsWithHidden[rowIndex].map((cell, index) => {
                                            const header = headersWithHidden[index];
                                            const isNested = typeof cell === "string" && cell.includes(":");
                                            let child = cell;

                                            if (isNested) {
                                                child = cell.split("\n").map((line, i) => {
                                                    const [key, value] = line.split(":").map((s) => s.trim());
                                                    return (
                                                        <p key={i} className={styles["nested-line"]}>
                                                            <span className={styles["value"]}>{value}</span>
                                                            <span className={styles["key"]}> ({key})</span>
                                                        </p>
                                                    );
                                                });
                                            }
                                            return (
                                                <div key={index} className={styles["sub-container"]}>
                                                    <div className={styles["subtitle"]}>{header}</div>
                                                    <div className={`${styles["subdata"]} ${isNested ? styles["nested"] : ""} ${isNested ? "ko-reg-15" : ""}`}>
                                                        {child}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </Column>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                );
            })}
        </tbody>
    );
}

export function TableBody({
    children,
    rowPaddingVertical = 22,
    textStyles,
    onSelect,
}) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const entity = new TableEntity(children);
    const rows = entity.getVisibleRows();
    const headers = entity.getVisibleHeaders();
    const columns = headers.length;

    const defaultTextStyles = new Array(columns).fill("ko-md-17");
    textStyles = textStyles ?? defaultTextStyles;

    const style = {
        paddingTop: rowPaddingVertical,
        paddingBottom: rowPaddingVertical,
    };

    const handleRowClick = (index) => {
        setSelectedIndex(index);
        if (onSelect) onSelect(index);
    };

    return (
        <tbody>
            {rows.map((row, rowIndex) => (
                <tr
                    key={rowIndex}
                    className={rowIndex === selectedIndex ? styles["selected"] : ""}
                    onClick={() => handleRowClick(rowIndex)}
                >
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={style} className={textStyles[cellIndex]}>
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
    columnRatios,
    paddingLeft,
    paddingRight,
    gap,
    ratioSum,
    isExpandable = false,
}) {
    let headers = children;
    const paddingVertical = 16;

    if (isExpandable) {
        headers = [...headers, ""];
        columnRatios = [...columnRatios, 24];
        ratioSum += 24 + gap;
    }

    const columns = headers.length;

    const style = (index) => {
        let width = columnRatios[index];

        if (index === 0) width += paddingLeft + gap * 0.5;
        else if (index === columns - 1) width += paddingRight + gap * 0.5;
        else width += gap;

        return {
            paddingTop: paddingVertical,
            paddingBottom: paddingVertical,
            width: `${width / ratioSum * 100}%`,
            minWidth: "24px",
        };
    };

    return (
        <thead>
            <tr className={styles["header"]}>
                {headers.map((title, index) => (
                    <th key={index} style={style(index)}>{title}</th>
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
    columnRatios,
    columnGap = 40,
    paddingLeft = 10,
    paddingRight = 10,
}) {
    const tableBody = React.Children.toArray(children)
        .find(child => [TableBody, TableExpandableBody].includes(child.type));
    const isExpandable = tableBody.type === TableExpandableBody;
    const entity = new TableEntity(tableBody.props.children);
    const headers = entity.getVisibleHeaders();

    columnRatios = columnRatios ?? new Array(headers.length).fill(100);
    const modifiedRatios = columnRatios.flatMap((ratio, index) =>
        index < columnRatios.length - 1 ? [ratio, columnGap] : [ratio]
    );

    const ratios = [paddingLeft, ...modifiedRatios, paddingRight];
    const ratioSum = ratios.reduce((a, b) => a + b, 0);

    let background = theme === "primary" ? "student" : "teacher";

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
            <table className={styles.table}>
                <TableHeader
                    columnRatios={columnRatios}
                    paddingLeft={paddingLeft}
                    paddingRight={paddingRight}
                    gap={columnGap}
                    ratioSum={ratioSum}
                    isExpandable={isExpandable}
                >{headers}</TableHeader>
                {children}
            </table>
            <div className={styles["scroll-gradient"]}></div>
        </div>
    );
}