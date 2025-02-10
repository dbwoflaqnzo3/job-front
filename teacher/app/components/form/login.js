'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Column } from "@/app/widgets/structure/Grid";
import { Button1, Button4 } from "@/app/components/ui/buttons/Regular";
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
      setError("An error occurred while logging in. Please try again.");
    }
  };
  

  return (
    <Column justifyContent="space-between">
      <Logo />
      <Column>
        <TextField
          placeholder="아이디/ID"
          value={formData.userId}
          onChange={(e) => handleInputChange("userId", e.target.value)}
        />
        <TextField
          type="password"
          placeholder="비밀번호/Password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
      </Column>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Column>
        <Button1 text="로그인" onClick={handleLogin} />
        <Button4 text="회원가입" />
      </Column>
    </Column>
  );
}