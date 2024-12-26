import styles from '../page.module.css';

export default function navigationBar(){
    return(
        <header className={styles.header}>
            {/* Logo Section */}
            <div className={styles.logoSection}>
                <div className={styles.logo}>JOB영어(로고)</div>
            </div>

            {/* Navigation Section */}
            <nav className={styles.navSection}>
                <div className={styles.nav}>
                <a href="#">학습하기</a>
                <a href="#">커리큘럼</a>
                <a href="#">나의 정보</a>
                <a href="#">결제</a>
                <a href="#">고객센터</a>
                </div>
                <button className={styles.logoutButton}>로그아웃</button>
            </nav>
        </header>
    );
}