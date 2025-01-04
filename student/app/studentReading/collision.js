"use client";

import { useState } from "react";
import { checkCollision } from "../util/utils";
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
    let IsCollision = false;
    let resetPos = null;    
    
    for (let i = 0; i < staticBoxes.length; i++){
      const staticBox = staticBoxes[i];
      const draggableBox = {
        left: x,
        top: y,
        right: x + 100,
        bottom: y + 100,
      }

      const staticBoxRect ={
        left: staticBox.x,
        top: staticBox.y,
        right: staticBox.x + staticBox.width,
        bottom: staticBox.y + staticBox.height,
      }

      const collision = checkCollision(draggableBox , staticBoxRect);

      if (collision){
        IsCollision = true;
        resetPos = { x:staticBox.x , y: staticBox.y };
        break;
      }

    }
    setIsColliding(IsCollision);
    setResetPosition(resetPos);
  };

  return (
    <div className={styles.ViewDragBlock_Setting}>
      {/* 고정된 객체 */}
      {staticBoxes.map((element , i) => (
        <div
        key={i}
        className={styles.StaticBox}
        style={{
          left: `${element.x}px`,
          top: `${element.y}px`,
          width: `${element.width}px`,
          height: `${element.height}px`
        }}
      />
      ))}

      {/* 드래그 가능한 객체 */}
      <DraggableBox
        onMove={handleCollision}
        isColliding={isColliding}
        resetPosition={resetPosition}
      />
    </div>
  );
}
