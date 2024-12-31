// 'use client' directive ensures client-side rendering
'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from '../styles/studentReading.module.css';

export default function StudentReading() {
  const router = useRouter();  
  // state로 id받기 먼저 ( useeffect써서 ) -> 그걸로 아래꺼 실행하기 
  

  //useEffect로 받아오기 ()
  useEffect(()=>{
    const fetchPostData = async () => {
      try{
        const res = await fetch(`/api/posts/${postId}`);
        if(!res.ok){
          throw new Error('Failed to fetch data');
        }
        const postData = await res.json();

      } catch (err){
        console.error('Error fetching post Data:', err);
      } finally {
        setLoading(false);
      }
    };

    if(postId){
      fetchPostData();
    }

  }, [])



  return (
        <div className={styles.container}>
            {/* Back Button */}
            <button className={styles.backButton} onClick={() => router.push('/')}>
                &#8592;
            </button>

            {/* Content Area */}
            <div className={styles.contentArea}>
                <h2 className={styles.title}>Reading</h2>
                <p className={styles.subtitle}>교재이름</p>
                <p className={styles.unitLesson}>학습유닛/레슨</p>
                <p className={styles.date}>12월 31일</p>

                {/* Start Button */}
                <button className={styles.startButton}>학습 시작하기</button>
            </div>
        </div>
    );
}
