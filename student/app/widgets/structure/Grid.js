
import styles from "./grid.module.css";

export function Grid({ 
  children, 
  row, 
  column, 
  gap = "10px",
}) {
  const style = {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: column ? `repeat(${column}, 1fr)` : "auto",
    gridAutoFlow: row ? "column" : "row",
    gridTemplateRows: row ? `repeat(${row}, auto)` : "auto",
    gap: gap,
  };

  return <div className={styles["grid-container"]} style={style}>{children}</div>;
}

export function Column({ 
  children, 
  justifyContent = "flex-start", 
  alignItems = "stretch", 
  gap = "10px",
}) {
  const shouldFlexGrow = ["space-between", "space-around", "space-evenly"].includes(justifyContent);

  const mergedStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent,
    alignItems,
    gap,
    flexGrow: shouldFlexGrow ? 1 : undefined, 
    width: "100%",
    height: "100%",
  };

  return <div className={styles["column"]} style={mergedStyle}>{children}</div>;
}

export function Row({ 
  children, 
  justifyContent = "flex-start", 
  alignItems = "center", 
  gap = "10px", 
}) {
  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: justifyContent,
    alignItems: alignItems,
    gap: gap,
    flexGrow: 1,
  };

  return (
    <div className={styles["row"]} style={style}>
      {children}
    </div>
  );
}
