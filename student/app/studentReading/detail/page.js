// 'use client' directive ensures client-side rendering
'use client';
import { useState, useEffect } from "react";
import styles from '../../styles/studentReading.module.css';
import { useSearchParams , useRouter} from "next/navigation";
import ContentDisplay from './problem'

export default function StudentReading() {
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit");
  const lessonTitle = searchParams.get("title");
  const router = useRouter();

  const [readingData, setReadingData] = useState({}); // API에서 받은 데이터를 저장
  const [problemIndex, setProblemIndex] = useState(0); // 문제 인덱스 



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

  const handleNext = () => {
    setProblemIndex((prevIndex) => (prevIndex !== null ? prevIndex + 1 : 0));
  };
  
  const handlePrevious = () => {
    setProblemIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : 0));
  };


  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.push('/')}>
          &#8592;
      </button>
      {readingData.content ? (<>
        <div className={styles.header}>
          <h2>{readingData.content.title}</h2>
          <p>Unit: {readingData.content.unit}</p>
        </div>
        <ContentDisplay
          engContent={readingData.content.eng}
          korContent={readingData.content.kor}
          problemIndex={problemIndex}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        /></>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    );
}
