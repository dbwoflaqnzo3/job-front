// 'use client' directive ensures client-side rendering
'use client';
import { useState, useEffect } from "react";
import styles from '../../styles/studentReading.module.css';
import { useSearchParams } from "next/navigation";


export default function StudentReading() {
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit");
  const lessonTitle = searchParams.get("title");

  const [readingData, setReadingData] = useState({}); // API에서 받은 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // 요청에 필요한 데이터 준비
        const requestData = {
          lesson: lessonTitle,   // 예시: 현재 교제의 대목
          curriNum: unit, // 예시: 학생의 현재 커리큘럼 정보
        };
  
        // fetch 요청 보내기
        const res = await fetch(`/api/posts/reading`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
  
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const postData = await res.json();
        console.log('Fetched Post Data:', postData);
        setReadingData(postData);
      } catch (err) {
        console.error('Error fetching post data:', err);
      } 
    };
  
  
    fetchPostData();
  }, [lessonTitle, unit]);



  return (
    <div className={styles.container}>
    {readingData.content ? (
      <div>
        <h2>{readingData.content.title}</h2>
        <p>Unit: {readingData.content.unit}</p>
        <div>
          <h3>Content:</h3>
          {readingData.content.eng.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div>
          <h3>Korean Content:</h3>
          {readingData.content.kor.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    ) : (
      <p>Loading...</p> // 데이터를 불러오는 동안 표시할 내용
    )}
  </div>
    );
}
