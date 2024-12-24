'use client'

import React, { useEffect, useState } from 'react';
import {
    validateName,
    validateBirthDate,
    validateSex,
    validatePhoneNumber,
    validateParentPhoneNumber,
    validateEmail,
    validateParentEmail,
    validateUserId,
    validatePassword,
    validatePasswordCheck,
    validateGrade,
    validateLevel
} from './validators';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        sex: '',
        phoneNumber: '',
        parentNumbers: [''],
        email: '',
        parentEmails: [''],
        userId: '',
        password: '',
        passwordCheck : "",
        gradeCategory: '',
        grade: '',
        level: '',
        status: 'Active',
    });

    const [errors, setErrors] = useState({
        name: '',
        birthDate: '',
        sex: '',
        phoneNumber: '',
        parentNumbers: ['', ''],
        email: '',
        parentEmails: ['', ''],
        userId: '',
        password: '',
        passwordCheck : "",
        gradeCategory: '',
        grade: '',
        level: '',
        status: '',
    });

    const [isDuplicate, setIsDuplicate] = useState(null);
    const [isChecked, setIsChecked] = useState(false); 
    const [isConfirmed, setIsConfirmed] = useState(false); // 사용 여부 확정
    const [feedbackMessage, setFeedbackMessage] = useState(""); 
    const [globalMessage, setGlobalMessage] = useState("") //제출시 오류 날때

    const gradeOptions = {
        Elementary: [1, 2, 3, 4, 5, 6],
        Middle: [1, 2, 3],
        High: [1, 2, 3],
        Other: [],
    };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleArrayInputChange = (index, e, key) => {
        const { value } = e.target;
        setFormData((prevData) => {
            const updatedArray = [...prevData[key]];
            updatedArray[index] = value;
            return { ...prevData, [key]: updatedArray };
        });
    };

    const addArrayField = (key) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: [...prevData[key], ''],
        }));
    };

    const removeArrayField = (key, index) => {
        setFormData((prevData) => {
            const updatedArray = [...prevData[key]];
            updatedArray.splice(index, 1);
            return { ...prevData, [key]: updatedArray };
        });
    };
    

    const handleValidation = (field) => {
        let error = '';
        switch (field) {
            case 'name':
                error = validateName(formData.name);
                break;
            case 'birthDate':
                error = validateBirthDate(formData.birthDate);
                break;
            case 'sex':
                error = validateSex(formData.sex);
                break;
            case 'phoneNumber':
                error = validatePhoneNumber(formData.phoneNumber);
                break;
            case 'email':
                error = validateEmail(formData.email);
                break;
            case 'parentNumbers':
                error = formData.parentNumbers.map(validateParentPhoneNumber);
                break;
            case 'parentEmails':
                error = formData.parentEmails.map(validateParentEmail);
                break;
            case 'userId':
                error = validateUserId(formData.userId);
                setIsChecked(true)
                break;
            case 'password':
                error = validatePassword(formData.password);
                break;
            case "passwordCheck":
                error = validatePasswordCheck(formData.passwordCheck, formData.password);
                break
            case 'grade':
                error = validateGrade(formData.grade);
                break;
            case 'level':
                error = validateLevel(formData.level);
                break;
            default:
                break;
        }
        setErrors({ ...errors, [field]: error });
    };

    const handleCheckDuplicated = async() => {
        try{
            const response =  await fetch("http://localhost:8080/student/idDuplicationCheck",
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 각 필드에 대한 유효성 검사
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            newErrors[field] = handleValidation(field);
        });

        setErrors(newErrors);

        // 에러가 없으면 폼 제출
        if (Object.values(newErrors).every((err) => !err) && isConfirmed) {
            try {
                const response = await fetch('http://localhost:8080/student/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Registration successful!');
                    setFormData({
                        name: '',
                        birthDate: '',
                        sex: '',
                        phoneNumber: '',
                        parentNumbers: ['', ''],
                        email: '',
                        parentEmails: ['', ''],
                        userId: '',
                        password: '',
                        passwordCheck: '',
                        gradeCategory: '',
                        grade: '',
                        level: '',
                        status: 'Active', // Match the default value from the initial state
                    });

                    setGlobalMessage(null)
                    

                    setIsChecked(false)
                    setIsConfirmed(false)
                    setIsDuplicate(null)
                } else {
                    const result = await response.json();
                    setErrors({ global: result.message || 'Registration failed.' });
                }
            } catch (err) {
                setErrors({ global: 'Error connecting to the server.' });
            }
        }
        else{
            setGlobalMessage('다음 사항들을 다시 확인하시고 시도해주시길 바랍니다.\n 1.모든 정보를 정확히 입력해주세요.\n 2.아이디에서 사용하기 버튼을 눌러주세요.')
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {errors.global && <p style={{ color: 'red' }}>{errors.global}</p>}
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} onBlur={() => handleValidation('name')} required />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                {/* Birth Date */}
                <div>
                    <label>Birth Date:</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} onBlur={() => handleValidation('birthDate')} required />
                    {errors.birthDate && <p style={{ color: 'red' }}>{errors.birthDate}</p>}
                </div>

                {/* Sex */}
                <div>
                    <label>Sex:</label>
                    <select name="sex" value={formData.sex} onChange={handleInputChange} onBlur={() => handleValidation('sex')} required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.sex && <p style={{ color: 'red' }}>{errors.sex}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} onBlur={() => handleValidation('phoneNumber')} required />
                    {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
                </div>

                {/* Parent Phone Numbers */}
                <div>
                    <label>Parent Phone Numbers:</label>
                    {formData.parentNumbers.map((num, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={num}
                                onChange={(e) => handleArrayInputChange(index, e, 'parentNumbers')}
                                onBlur={() => handleValidation('parentNumbers')}
                                required
                            />
                            {index > 0 && <button type="button" onClick={() => removeArrayField('parentNumbers', index)}>Remove</button>}
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayField('parentNumbers')}>Add Parent Number</button>
                    {errors.parentNumbers && <p style={{ color: 'red' }}>{errors.parentNumbers}</p>}
                </div>


                {/* Email */}
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={() => handleValidation('email')} required />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>


                {/* Parent Emails */}
                <div>
                    <label>Parent Emails:</label>
                    {formData.parentEmails.map((email, index) => (
                        <div key={index}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleArrayInputChange(index, e, 'parentEmails')}
                                onBlur={() => handleValidation('parentEmails')}
                                required
                            />
                            {index > 0 && <button type="button" onClick={() => removeArrayField('parentEmails', index)}>Remove</button>}
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayField('parentEmails')}>Add Parent Email</button>
                    {errors.parentEmails && <p style={{ color: 'red' }}>{errors.parentEmails}</p>}
                </div>

                {/* User Id */}
                <div>
                    <label htmlFor="userId">아이디 :</label>
                    <input
                        type="text"
                        name="userId"
                        id="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
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
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} onBlur={() => handleValidation('password')} required />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                {/* Password Double Check */}
                <div>
                    <label htmlFor="passwordCheck">비밀번호 검증 :</label>
                    <input
                        type="password"
                        name="passwordCheck"
                        id="passwordCheck"
                        value={formData.passwordCheck}
                        onChange={handleInputChange}
                        onBlur={() => handleValidation("passwordCheck")}
                        required
                    />
                    {errors.passwordCheck && <p style={{ color: "red" }}>{errors.passwordCheck}</p>}
                </div>


                {/* Grade Category */}
                <div>
                    <label>Grade Category:</label>
                    <select
                        name="gradeCategory"
                        value={formData.gradeCategory}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Elementary">Elementary</option>
                        <option value="Middle">Middle School</option>
                        <option value="High">High School</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                {/* Grade */}
                {formData.gradeCategory && formData.gradeCategory !== 'Other' && (
                    <div>
                        <label>Grade:</label>
                        <select
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select</option>
                            {gradeOptions[formData.gradeCategory].map((grade) => (
                                <option key={grade} value={grade}>
                                    {grade}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                

                {/* Level */}
                <div>
                    <label>Level:</label>
                    <select name="level" value={formData.level} onChange={handleInputChange} onBlur={() => handleValidation('level')}>
                        <option value="">Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    {errors.level && <p style={{ color: 'red' }}>{errors.level}</p>}
                </div>


                {/* Status */}
                <div>
                    <label>Status:</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Graduated">Graduated</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>

            {globalMessage == ""? <p></p> :<p style={{ color: "red" }}>{globalMessage}</p>}
        </div>
    );
};


