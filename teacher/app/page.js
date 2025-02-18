"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/loginPage');
    }, 1000); // 1초 후 리다이렉트

    return () => clearTimeout(timer); // 타이머 클린업
  }, [router]);

  return <div>Redirecting to the login page...</div>;
}
