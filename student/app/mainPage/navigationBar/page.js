'use client'
import { useState } from 'react';
import Link from 'next/link'
import styles from '../page.module.css';

export default function navigationBar(){
    const userName = '반대준';
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴 상태

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev); // 클릭 시 상태를 토글
    };

    return(
        <header className={styles.header}>
            {/* Logo Section */}
            <div className={styles.logoSection}>
                <div className={styles.logo}>JOB영어(로고)</div>
            </div>

            {/* Navigation Section */}
            <nav className={styles.navSection}>
                <div className={styles.navStudent}>
                    <a href="#">학습하기</a>
                    <a href="#">학습캘린더</a>
                    <a href="#">질문하기</a>
                    <a href="#">결제하기</a>
                </div>
                <div className={styles.navService}>
                    <div className={styles.serviceButton} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <div className={styles.dropdownButton}>고객센터</div>
                        {isHovered && (
                            <div className={styles.dropdownMenu}>
                                <Link href="/page1">
                                    <button className={styles.menuButton}>Go to Page 1</button>
                                </Link>
                                <Link href="/page2">
                                    <button className={styles.menuButton}>Go to Page 2</button>
                                </Link>
                            </div>
                        )}
                    </div>
                    <button className={styles.logoutButton} >
                        {userName}님
                    </button>
                </div>
            </nav>
        </header>
    );
}