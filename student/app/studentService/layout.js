import localFont from "next/font/local";
import Link from 'next/link';
import styles from './layout.module.css'; 

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.navContainer}>
          <div className={styles.jobLogo}>JOB</div>
          <div className={styles.navElements}>
          <nav>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link href="/studentReading">학습하기</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/#">학습캘린더</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/#">나의 정보</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/#">결제하기</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/#">질문하기</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/studentService">고객센터</Link>
                </li>
              </ul>
            </nav>
            <div className={styles.logout}>
              <Link href="/logout">로그아웃</Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
