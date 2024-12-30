"use client";

import { useState } from "react";
import { checkCollision } from "../util/collision";
import DraggableBox from "./dragBlock";
import styles from "../styles/studentReading.module.css";



export default function CollisionDetector() {
  const [isColliding, setIsColliding] = useState(false);
  const [resetPosition, setResetPosition] = useState(null);

  const staticBoxes = [
    { x: 100, y: 300, width: 100, height: 100 },
    { x: 300, y: 300, width: 150, height: 150 },
    { x: 500, y: 300, width: 120, height: 120 },
  ];


  const handleCollision = (x, y) => {
    const draggableBox = {
      left: x,
      top: y,
      right: x + 100,
      bottom: y + 100,
    };

    const staticBoxRect = {
      left: staticBox.x,
      top: staticBox.y,
      right: staticBox.x + staticBox.width,
      bottom: staticBox.y + staticBox.height,
    };

    const collision = checkCollision(draggableBox, staticBoxRect);

    setIsColliding(collision);

    if (collision) {
      setResetPosition({ x: staticBox.x, y: staticBox.y });
    } else {
      setResetPosition(null);
    }
  };

  return (
    <div className={styles.ViewDragBlock_Setting}>
      {/* 고정된 객체 */}
      <div
        className={styles.StaticBox}
        style={{
          left: `${staticBox.x}px`,
          top: `${staticBox.y}px`,
        }}
      />

      {/* 드래그 가능한 객체 */}
      <DraggableBox
        onMove={handleCollision}
        isColliding={isColliding}
        resetPosition={resetPosition}
      />
    </div>
  );
}
