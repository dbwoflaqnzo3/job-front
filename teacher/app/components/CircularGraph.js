import React, { useState, useEffect, useRef } from "react";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import "./circularGraph.css";

export function SemiCircularGraph({ 
  percentage,
  size = 180,
  lineWidth, 
}) {
  return <CircularProgressBar
    colorCircle="var(--secondary-100)"
    colorSlice="var(--secondary-500)"
    fontColor="var(--black-1000)"
    percent={Number(percentage * 100)}
    size={size}
    stroke={lineWidth}
    cut={50}
    rotation={180}
    textPosition="-.01em"
    round
  />;
}

export function CircularGraph({ 
  percentage,
  size = 180,
  lineWidth = 10,
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  percentage = .5;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (!containerRef.current) return;
      observer.unobserve(containerRef.current);
    };
  }, [hasAnimated]);

  const style = { 
    "--size": `${size}px`,
    "--radius": `calc(${lineWidth}px * .85 * 1.5)`,
    "--angle": `calc(360deg * ${percentage})`,
    "--duration": `calc(1.6s * ${percentage})`,
  };

  return (
    <div className="cg-container" ref={containerRef} style={style}>
      <div className="cg-absolute">
        <CircularProgressBar
          colorCircle="var(--secondary-100)"
          colorSlice="var(--secondary-500)"
          fontColor="var(--black-1000)"
          percent={Number(percentage * 100)}
          size={size}
          stroke={lineWidth}
          animationTime={1.6}
        />
      </div>
      <div className="cg-absolute">
        <div className={`cg-rotation-bar ${hasAnimated ? "animate" : ""}`}>
          <div className="cg-hidden-bar"></div>
          <div className="cg-indicator-circle"></div>
        </div>
      </div>
    </div>
  );
}