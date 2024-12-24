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
        IdDuplication : "",
    };

    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState(initialErrorState)

    const [isDuplicate, setIsDuplicate] = useState(null); // 중복 여부: null, true, false
    const [isConfirmed, setIsConfirmed] = useState(false); // 사용 여부 확정
    const [isChecked, setIsChecked] = useState(false); // 사용 여부 확정
    const [feedbackMessage, setFeedbackMessage] = useState(""); // 피드백 메시지
    const [globalMessage, setGlobalMessage] = useState("") //제출시 오류 날때

    //id 중복 확인
    const handleCheckDuplicated = async() => {
        try{
            const response =  await fetch("http://localhost:8080/teacher/idDuplicationCheck",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({userId : formData.userId}),
                }
            )

            if(response.ok){
                const result = await response.json()

                if (result.isDuplicated) {
                    setIsDuplicate(true)
                    setFeedbackMessage("이미 사용 중인 아이디입니다.")
                } else {
                    setIsDuplicate(false)
                    setFeedbackMessage("사용이 가능한 아이디입니다.")
                }
            }
            else{
                const errorData = await response.json();
                setFeedbackMessage(errorData.message || "서버 오류가 발생했습니다.");
            }
        }
        catch(error){
            setFeedbackMessage("오류가 발생했습니다. 다시 시도해주세요.")
        }
    }

    // "사용하기" 버튼 핸들러
    const handleConfirm = () => {
        setIsConfirmed(true);
        setFeedbackMessage("이 아이디를 사용합니다.")
    }

    // "취소하기" 버튼 핸들러
    const handleCancel = () => {
        setIsConfirmed(false);
        setFormData({ ...formData, [userId]: "" })
        setFeedbackMessage("")
    }

    // 필드 값 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

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
                setIsChecked(true)
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
        if (Object.values(newErrors).every((err) => !err) && isConfirmed) {
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
        else{
            setGlobalMessage('다음 사항들을 다시 확인하시고 시도해주시길 바랍니다.\n 1.모든 정보를 정확히 입력해주세요.\n 2.아이디에서 사용하기 버튼을 눌러주세요.')
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
                    disabled={isConfirmed} // 사용 확정 시 비활성화
                    required
                />

                {!isConfirmed && (
                    <button
                        onClick={isDuplicate === false ? handleConfirm : handleCheckDuplicated}
                        disabled={!formData.userId.trim() || errors.userId || !formData.userId || !isChecked} // 조건 추가
                        
                    >
                        {isDuplicate === false ? "사용하기" : "중복 확인"}
                    </button>
                )}
                {isConfirmed && <button onClick={handleCancel}>취소하기</button>}
                {feedbackMessage && (
                    <p style={{ color: isDuplicate === null ? "black" : isDuplicate ? "red" : "green" }}>
                    {feedbackMessage}
                    </p>
                )}


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
            {globalMessage == ""? <p></p> :<p style={{ color: "red" }}>{globalMessage}</p>}
        </form>
    );
}
