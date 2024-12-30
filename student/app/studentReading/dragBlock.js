"use client";

import { useState, useEffect } from "react";
import styles from "../styles/studentReading.module.css";

export default function DraggableBox({ onMove, isColliding, resetPosition }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    setPosition({ x: newX, y: newY });
    onMove(newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (resetPosition) {
      setPosition(resetPosition);
    }
  }, [resetPosition]);

  return (
    <div
      className={styles.DraggableBox}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className={styles.Draggable}
        onMouseDown={handleMouseDown}
        style={{
          left: position.x,
          top: position.y,
          background: isColliding ? "red" : "lightblue",
        }}
      />
    </div>
  );
}
