'use client'

import Head from 'next/head';
import NavBar from './navigationBar/page.js';
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { getUserInfo } from "../utils/mainPageUtil.js"


export default function MainPage(){

  const [userId, setUserId] = useState('대준이');
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async() => {
      try
      {
        const token = document.cookie; // Read cookies

        const result = await getUserInfo(token)

        setUserId(result.name)
        
      }catch(e){

      }
    }

    fetchUserData()
  })

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
    
        
        // alert("Logout successful!");
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear token on logout
        router.push("/loginPage");
    
    } catch (error) {
      console.log(error);
      alert("An error occurred during logout.");
    }
};

const handleStartStudy = () => {
  router.push("/mainPage/lessonListPage")
}

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Head>
          <title>Job 영어 Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
  
        {/* Navigation Bar */}
        <NavBar />
  
        {/* Main Content */}
        <main className={styles.main}>
          {/* 유저 정보 및 수업 진행도 */}
          <div className={styles.grid}>
            {/* User Content */}
            <div className={styles.user}>
              <div className={styles.info}>
                <div>
                  <p className={styles.name}>{userId}님</p>
                  <p className={styles.teacher}>이름 | 담당선생님</p>
                </div>
              </div>
              <div className={styles.infoBtn}>
                <button className={styles.myInfoButton}>내 정보 수정</button>
                <button className={styles.logoutButton} onClick={handleLogout}>로그아웃</button>
              </div>
            </div>
  
            {/* 오늘의 진행도 */}
            <div className={styles.progressGrid}>
              <div className={styles.message}>오늘 이만큼 했어요!</div>
              <div className={styles.progress}>
                <div className={styles.progressContainer}>
                  <div className={styles.circleProgress}>
                    <svg className={styles.progressSvg}>
                      <circle className={styles.circleBg} r="92" cx="106" cy="106"></circle>
                      <circle className={styles.circleFg} r="92" cx="106" cy="106"></circle>
                    </svg>
                    <div className={styles.progressText}>75%</div>
                  </div>
                  <p className={styles.note}>잘하고 있어요!</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Start Learning Button */}
          <div className={styles.startLearning}>
            <div className={styles.graphic}>
              <button className={styles.startButton} onClick={handleStartStudy}>오늘 학습 시작하기</button>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}