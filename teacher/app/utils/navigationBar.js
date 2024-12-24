"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const NavigationBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter()


    const links = [
        { href: "/startPage", label: "Home" },
        { href: "/loginPage", label: "Login" },
        { href: "/studentManagement/register", label: "학생등록" },
    ];

    useEffect(() => {
        async function checkUserSession() {
            try {
                const response = await fetch('http://localhost:8080/teacher/readSessionInfo', {
                    method: 'GET',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    credentials: 'include', // 쿠키 포함
                });

                if(response.ok)
                {
                    const result = await response.json()
                    console.log(result)
                    setIsLoggedIn(true)
                    setErrorMessage(null)
                    setUserId(result.data.name); // 세션에 사용자 정보가 있으면 저장
                }
                else
                {
                    const error = await response.json()
                    setIsLoggedIn(false)
                    setErrorMessage(error.data.message)
                }
            } catch (error) {
                console.log(error)
                setErrorMessage("서버 에러")
            } 
        }
    
        checkUserSession();
      }, [pathname]); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행


    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/teacher/logout', {
                method: 'POST',
                credentials: 'include', // 쿠키를 포함하여 요청 보내기
            });

            if (response.ok) {
                alert('Logout successful!');
                setIsLoggedIn(false);  // 로그아웃 시 상태 변경
                router.push('/loginPage')
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Logout failed. Please try again.');
            }
        } catch (error) {
            console.log(error)
            setErrorMessage('An error occurred during logout.');
        }
    };

    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                {links.map((link) => (
                <li key={link.href} style={pathname === link.href ? styles.active : styles.li}>
                    <Link href={link.href} style={styles.link}>
                    {link.label}
                    </Link>
                </li>
                ))}
                {errorMessage && <p>{errorMessage}</p>}
                <li style={styles.right}>
                    {isLoggedIn ? (
                        <>
                        <span style={styles.username}>{userId}</span>
                        <button style={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                        </>
                    ) : (
                        <Link href="/loginPage" style={styles.loginButton}>
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: "#f8f9fa",
        padding: "10px 20px",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
    },
    ul: {
        listStyle: "none",
        display: "flex",
        margin: 0,
        padding: 0,
        width: "100%",
    },
    li: {
        marginRight: "20px",
    },
    active: {
        marginRight: "20px",
        fontWeight: "bold",
        textDecoration: "underline",
    },
    right: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
    },
    username: {
        marginRight: "15px",
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
    },
    loginButton: {
        textDecoration: "none",
        color: "#0070f3",
        fontWeight: "bold",
    },
    link: {
        textDecoration: "none",
        color: "#0070f3",
    },
};


export default NavigationBar;
