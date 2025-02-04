import "./Grid.css";

export function Grid({ children, row, column, gap = "10px" }) {
  const style = {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: column ? `repeat(${column}, 1fr)` : "auto",
    gridAutoFlow: row ? "column" : "row",
    gridTemplateRows: row ? `repeat(${row}, auto)` : "auto",
    gap: gap,
  };

  return <div className="grid-container" style={style}>{children}</div>;
}

export function Column({ children, gap }) {
  return <Grid column="1" gap={gap}>{children}</Grid>;
}

export function Row({ children, gap }) {
  return <Grid row="1" gap={gap}>{children}</Grid>;
}