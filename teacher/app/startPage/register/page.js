"use client"

import { useState } from "react";
import { 
    validateName, 
    validateBirthDate, 
    validateSex, 
    validatePhoneNumber, 
    validateEmail, 
    validateUserId, 
    validatePassword,
    validatePasswordCheck
} from "./validators";

export default function SignupForm() {

    const initialFormState = {
        name: "",
        birthDate: "",
        sex: "",
        phoneNumber: "",
        email: "",
        userId: "",
        password: "",
        passwordCheck : "",
    };
    
    const initialErrorState = {
        name: "",
        birthDate: "",
        sex: "",
        phoneNumber: "",
        email: "",
        userId: "",
        password: "",
        passwordCheck : "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrorState);

    // 필드 값 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 유효성 검사 수행
    const handleValidation = (field) => {
        let error = "";
        switch (field) {
            case "name":
                error = validateName(formData.name);
                break;
            case "birthDate":
                error = validateBirthDate(formData.birthDate);
                break;
            case "sex":
                error = validateSex(formData.sex);
                break;
            case "phoneNumber":
                error = validatePhoneNumber(formData.phoneNumber);
                break;
            case "email":
                error = validateEmail(formData.email);
                break;
            case "userId":
                error = validateUserId(formData.userId);
                break;
            case "password":
                error = validatePassword(formData.password);
                break;
            case "passwordCheck":
                error = validatePasswordCheck(formData.passwordCheck, formData.password);
            default:
                break;
        }
        setErrors({ ...errors, [field]: error });
    };

    // 폼 제출 처리
    const handleSubmit = async(e) => {
        e.preventDefault();

        // 모든 필드 유효성 검사
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            newErrors[field] = handleValidation(field);
        });

        setErrors(newErrors);

        // 에러가 없으면 제출
        if (Object.values(newErrors).every((err) => !err)) {
            try{
                const response = await fetch("http://localhost:8080/teacher/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(formData),
                })

                if (response.ok) {
                    const result = await response.json()
                    alert("Form submitted successfully!");
                    setFormData({
                        name: "",
                        birthDate: "",
                        sex: "",
                        phoneNumber: "",
                        email: "",
                        userId: "",
                        password: "",
                        passwordCheck: "",
                    })
                }
                else {
                    const errorData = await response.json()
                    alert("Error occured")
                    setErrors(errorData.message || 'An error occurred.')
                }
            }
            catch (err) {
                setErrors('Failed to register teacher. Please try again.')
                console.log(err)
            }            
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">이름 :</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleValidation("name")}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="birthDate">생년월일 :</label>
                <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    onBlur={() => handleValidation("birthDate")}
                />
                {errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}
            </div>

            {/* Sex */}
            <div>
                <label htmlFor="sex">성별 :</label>
                <select
                    name="sex"
                    id="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    onBlur={() => handleValidation("sex")}
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.sex && <p style={{ color: "red" }}>{errors.sex}</p>}
            </div>

            {/* Phone Number */}
            <div>
                <label htmlFor="phoneNumber">전화번호 :</label>
                <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="- 없이 입력"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={() => handleValidation("phoneNumber")}
                    required
                />
                {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email">이메일 :</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleValidation("email")}
                    required
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            {/* User ID */}
            <div>
                <label htmlFor="userId">아이디 :</label>
                <input
                    type="text"
                    name="userId"
                    id="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    onBlur={() => handleValidation("userId")}
                    required
                />
                {errors.userId && <p style={{ color: "red" }}>{errors.userId}</p>}
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password">비밀번호 :</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleValidation("password")}
                    required
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            </div>

            {/* Password Double Check */}
            <div>
                <label htmlFor="passwordCheck">비밀번호 검증 :</label>
                <input
                    type="password"
                    name="passwordCheck"
                    id="passwordCheck"
                    value={formData.passwordCheck}
                    onChange={handleChange}
                    onBlur={() => handleValidation("passwordCheck")}
                    required
                />
                {errors.passwordCheck && <p style={{ color: "red" }}>{errors.passwordCheck}</p>}
            </div>


            {/* 다른 필드 추가 */}
            <button type="submit">Submit</button>
        </form>
    );
}
