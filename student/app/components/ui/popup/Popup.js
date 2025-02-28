import React, { cloneElement } from "react";
import DynamicImage from "../image/DynamicImage";
import styles from "./popup.module.css";

function applyThemeRecursively(children, theme) {
    return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const newProps = { theme: child.props.theme || theme };
        if (child.props.children) {
            newProps.children = applyThemeRecursively(child.props.children, theme);
        }
        return cloneElement(child, newProps);
    });
}

export function Popup({
    theme = "primary",
    title,
    description,
    display,
    image,
    imagePosX = .5,
    imagePosY = .5,
    onClose,
    children,
}) {
    if (!display) return null;

    title = title.split("\\n").map((line, index) => (
        <span key={index}>
            {line}
            {index !== title.split("\\n").length - 1 && <br />}
        </span>
    ));

    const style = { "--image-pos-x": `${imagePosX * 100}%`, "--image-pos-y": `${imagePosY * 100}%` };

    return (
        <div className={`overlay ${styles["overlay"]}`} onClick={onClose} style={style}>
            <div className={styles["popup"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["image"]}><DynamicImage image={image} /></div>
                <h2 className={`${styles["title"]} ko-sb-30`}>{title}</h2>
                <p className={`${styles["description"]} ko-sb-20`}>{description}</p>
                <div className={styles["content"]}>
                    {applyThemeRecursively(children, theme)}
                </div>
            </div>
        </div>
    );
}

export const PopupContent = ({ theme, children }) => (
    <div className={styles["popup-content"]}>{applyThemeRecursively(children, theme)}</div>
);

export const PopupButtons = ({ theme, children }) => (
    <div className={styles["popup-buttons"]}>{applyThemeRecursively(children, theme)}</div>
);