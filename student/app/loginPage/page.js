"use client"
import { useState } from 'react';

export default function Login() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

    const [error, setError] = useState('');

    // 입력값 상태 업데이트 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 폼 제출 시 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 항목이 비어있으면 에러 처리
        if (!formData.userId || !formData.password) {
            setError('모든 필드를 입력해야 합니다.');
            return;
        }

        // 로그인 API 요청 보내는 코드 (예시)
        try {

            // alert(JSON.stringify(formData))
            //fetch 요청
            const response = await fetch('http://localhost:8080/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // formData는 로그인 폼의 데이터
            });
        
            const result = await response.json();
        
            if (response.ok) {
                // 로그인 성공 시, 토큰을 콘솔에 출력
                document.cookie = `token=${result.token}; path=/;`;
                alert("Login Success")

                // console.log('로그인 성공!');
                // console.log('JWT 토큰:', result.token);  // 서버에서 응답받은 토큰 출력
        
                // 예시: 로그인 성공 후 페이지 리디렉션
                window.location.href = "/mainPage";  // 원하는 페이지로 리디렉션 가능

            } else {
                // 로그인 실패 시 에러 메시지 출력
                setError(result.message || '로그인 실패');
            }
        } catch (err) {
            // 서버와의 연결 문제
            setError('서버와의 연결 문제로 로그인에 실패했습니다.');
        }
    }

    return (
        <div>
            <h1>로그인 페이지</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">패스워드</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
