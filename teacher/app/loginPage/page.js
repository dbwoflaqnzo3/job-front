'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TeacherLogin = () => {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

    const router = useRouter()
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:8080/teacher/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // 세션 방식을 사용할 때 쿠키를 포함
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Login successful!');
                setIsLoggedIn(true)
                console.log('Login Result:', result); // 필요하면 세부 데이터를 확인
                router.push("/startPage")
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.log(err)
            setError('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h1>Teacher Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userId">User ID:</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
        </div>
    );
};

export default TeacherLogin;
