'use client';

import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SizedBox from "@/app/widgets/structure/SizedBox";
import { Column, Row } from "@/app/widgets/structure/Grid";
import { Button1, Button4, TextButton } from "@/app/components/ui/buttons/Regular";
import TextField from "@/app/components/ui/TextField";
import Logo from "@/public/assets/images/logo.svg";

export default function LoginForm() {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:8080/teacher/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        router.push("/startPage");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("*아이디/비밀번호가 일치하지 않습니다");
    }
  };

  return (
    <div style={{width: "100%", height: "100%"}}>
      <Column justifyContent="space-between">
        <div className={styles["logo"]}><Logo /></div>
        <Column gap={0} justifyContent="center">
          <TextField
            placeholder="아이디/ID"
            value={formData.userId}
            onChange={(e) => handleInputChange("userId", e.target.value)}
            error={error}
            stretch 
          />
          <SizedBox height={24} />
          <TextField
            type="password"
            placeholder="비밀번호/Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={error}
            stretch 
          />
          <SizedBox height={4} />
          <SizedBox height={10}><p className={`ko-md-13 ${styles["error"]}`}>{error}</p></SizedBox>
        </Column>
        <Column gap={16} justifyContent="end">
          <Button1 text="로그인" onClick={handleLogin} stretch />
          <Button4 text="회원가입" stretch />
          <TextButton text="비밀번호를 잊으셨나요?"  />
        </Column>
      </Column>
    </div>
  );
}