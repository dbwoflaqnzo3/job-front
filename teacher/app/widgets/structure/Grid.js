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
    ...styles,
  };

  return <div className="grid-container" style={style}>{children}</div>;
}

// ✅ Column은 Flexbox 기반 (Flutter처럼 수직 정렬)
export function Column({ 
  children, 
  justifyContent = "flex-start", 
  alignItems = "stretch", 
  gap = "10px",
}) {
  // ✅ `justifyContent`가 특정 값일 때만 `flexGrow: 1` 자동 적용
  const shouldFlexGrow = ["space-between", "space-around", "space-evenly"].includes(justifyContent);

  const mergedStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent,
    alignItems,
    gap,
    flexGrow: shouldFlexGrow ? 1 : undefined,  // ✅ 더 일반적인 방식으로 처리
    height: "100%", // ✅ 내부 요소가 자동으로 확장되도록 설정
  };

  return <div style={mergedStyle}>{children}</div>;
}

// ✅ Row는 Flexbox 기반 (Flutter처럼 수평 정렬)
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

// import "./Grid.css";

// export function Grid({ 
//   children, 
//   row, 
//   column, 
//   gap = "10px",
// }) {
//   const style = {
//     display: "grid",
//     alignItems: "center",
//     gridTemplateColumns: column ? `repeat(${column}, 1fr)` : "auto",
//     gridAutoFlow: row ? "column" : "row",
//     gridTemplateRows: row ? `repeat(${row}, auto)` : "auto",
//     gap: gap,
//   };

//   return <div className="grid-container" style={style}>{children}</div>;
// }

// export function Column({ children, gap }) {
//   return <Grid column="1" gap={gap}>{children}</Grid>;
// }

// export function Row({ children, gap }) {
//   return <Grid row="1" gap={gap}>{children}</Grid>;
// }