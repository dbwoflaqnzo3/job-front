"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const NavigationBar = () => {

    const [isLoginPage, setIsLoginPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter()

    const links = [
        { href: "/mainPage", label: "Home" },
        { href: "/loginPage", label: "Login" },
    ];

    useEffect(() => {
        // Update isLoginPage based on current route
        if (pathname === "/loginPage") {
            setIsLoginPage(true);
        } else {
            setIsLoginPage(false);
        }
    
        // Check user authentication via JWT in cookies
        async function checkUserSession() {
            try {
                    const cookies = document.cookie; // Read cookies
                    const token = cookies
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1]; // Extract token value
        
                if (!token) {
                    setIsLoggedIn(false);
                    setErrorMessage("No token found. Please log in.");
                    return;
                }
        
                const response = await fetch("http://localhost:8080/student/validateToken", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                });
        
                if (response.ok) {
                    const result = await response.json();
                    setIsLoggedIn(true);
                    setErrorMessage(null);
                    setUserId(result.data.name); // Assuming the server returns user details
                } else {
                    setIsLoggedIn(false);
                    setErrorMessage("Invalid or expired token. Please log in again.");
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear token
                    window.location.href = "/loginPage"; 
                }
            } catch (error) {
                console.log(error);
                setErrorMessage("Server error. Please try again later.");
            }
        }
    
        checkUserSession();
        }, [pathname]);
    
        const handleLogout = async () => {
            try {
                const cookies = document.cookie;
                const token = cookies
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1];
            
                if (!token) {
                    alert("You are not logged in.");
                    router.push("/loginPage");
                    return;
                }
            
                
                alert("Logout successful!");
                setIsLoggedIn(false);
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear token on logout
                router.push("/loginPage");
            
            } catch (error) {
            console.log(error);
                setErrorMessage("An error occurred during logout.");
            }
        };

    return (
    
        <nav className={{ ...styles.nav, display: isLoginPage ? "none" : "flex" }}>
            <ul className={styles.ul}>
                {links.map((link) => (
                <li key={link.href} className={pathname === link.href ? styles.active : styles.li}>
                    <Link href={link.href} className={styles.link}>
                    {link.label}
                    </Link>
                </li>
                ))}
                {errorMessage && <p>{errorMessage}</p>}
                <li className={styles.right}>
                    {isLoggedIn ? (
                        <>
                        <span className={styles.username}>{userId}</span>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                        </>
                    ) : (
                        <Link href="/loginPage" className={styles.loginButton}>
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