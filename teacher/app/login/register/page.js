"use client"
import { useState } from "react";

export default function TeacherRegister() {
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        sex: "Male", // 기본값
        phoneNumber: "",
        email: "",
        userId: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form 값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  // Form 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

    try {

        const response = await fetch("http://localhost:8080/teacher/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to register. Please check your input.");
        }

        const data = await response.json();
        setSuccess("Teacher registered successfully!");
        setFormData({
            name: "",
            birthDate: "",
            sex: "Male",
            phoneNumber: "",
            email: "",
            userId: "",
            password: "",
        });
        } catch (err) {
        setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1>Teacher Registration</h1>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}
        <form onSubmit={handleSubmit}>
            {/* Name */}
            <div>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            </div>

            {/* Birth Date */}
            <div>
            <label>Birth Date:</label>
            <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
            />
            </div>

            {/* Sex */}
            <div>
            <label>Sex:</label>
            <select name="sex" value={formData.sex} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            </div>

            {/* Phone Number */}
            <div>
            <label>Phone Number:</label>
            <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
            />
            </div>

            {/* Email */}
            <div>
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            </div>

            {/* User ID */}
            <div>
            <label>User ID:</label>
            <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
            />
            </div>

            {/* Password */}
            <div>
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
  );
}
