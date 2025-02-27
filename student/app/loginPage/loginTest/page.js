"use client";

import { useState, useEffect } from "react";
import Card from "@/app/components/ui/Card";
import LoginForm from "@/app/components/form/login";
import styles from "./page.module.css";

export default function Login() {
  const width = 684;
  const height = `calc(100vh - 96px)`;
  const paddingHorizontal = 142;
  const paddingVertical = 90;

  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1368);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`page ${styles["login"]}`}>
      <div className={`${styles["align"]} ${isWideScreen ? styles["right"] : styles["center"]}`}>
        <Card 
          width={width}
          height={height}
          paddingHorizontal={paddingHorizontal}
          paddingVertical={paddingVertical}
        >
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}