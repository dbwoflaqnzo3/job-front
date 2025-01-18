'use client'

import NavBar from '../navigationBar/page.js';
import styles from './page.module.css';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function LessonListPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { title: 'Vocabulary', progress: 30 },
    { title: 'Reading', progress: 30 },
    { title: 'Writing', progress: 30 },
    { title: 'Speaking', progress: 30 },
    { title: 'Listening', progress: 30 }
  ];

  const lessons = [
    { id: 1, title: '전문장 기본_11.S+V+O+OC 암기테스트', type: 'BT' },
    { id: 2, title: '전문장 기본_11.S+V+O+OC 암기테스트', type: 'BT' },
    { id: 3, title: '전문장 기본_11.S+V+O+OC 암기테스트', type: 'BT' },
    { id: 4, title: '전문장 기본_11.S+V+O+OC 암기테스트', type: 'BT' }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <NavBar/>
        <h1 className={styles.title}>학습하기</h1>
        <div className={styles.cardContainer}>
          {categories.map((category, index) => (
            <div key={index} className={styles.card} onClick={() => setSelectedCategory(category)}>
              <h2 className={styles.cardTitle}>{category.title}</h2>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progress} 
                    style={{ transform: `rotate(${category.progress * 1.8}deg)` }}
                  />
                </div>
                <div className={styles.progressText}>{category.progress}%</div>
              </div>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  전문장 기본_11.S+V+O+<br />OC 암기테스트
                </div>
                <div className={styles.timelineItem}>
                  전문장 기본_11.S+V+O+<br />OC 암기테스트
                </div>
                <div className={styles.timelineItem}>
                  전문장 기본_11.S+V+O+<br />OC 암기테스트
                </div>
              </div>
              <a href="#" className={styles.progressLink}>진도표 보기</a>
              <button className={styles.startButton}>학습하기</button>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>{selectedCategory.title} - 교재이름</h2>
                <button 
                  className={styles.closeButton}
                  onClick={() => setSelectedCategory(null)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.dateSection}>
                  <span className={styles.month}>12월<br/>DEC</span>
                </div>
                <div className={styles.lessonList}>
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className={styles.lessonItem}>
                      <span className={styles.lessonNumber}>{lesson.id}</span>
                      <span className={styles.lessonTitle}>{lesson.title}</span>
                      <span className={styles.lessonType}>{lesson.type}</span>
                      <button className={styles.lessonButton}>학습하기</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// 'use client'

// import NavBar from '../navigationBar/page.js';
// import styles from './page.module.css';
// import Image from 'next/image';

// export default function LessonListPage() {
//     const categories = [
//     { title: 'Vocabulary', progress: 30 },
//     { title: 'Reading', progress: 30 },
//     { title: 'Writing', progress: 30 },
//     { title: 'Speaking', progress: 30 },
//     // { title: 'Listening', progress: 0, hasCharacter: true }
//     ];

//     return (
//         <div className={styles.wrapper}>
//         <div className={styles.container}>
//             <NavBar />
//             <h1 className={styles.title}>학습하기</h1>
//             <div className={styles.cardContainer}>
//             {categories.map((category, index) => (
//                 <div key={index} className={styles.card}>
//                 <h2 className={styles.cardTitle}>{category.title}</h2>
//                 {!category.hasCharacter ? (
//                     <div className={styles.progressContainer}>
//                     <div className={styles.progressBar}>
//                         <div 
//                         className={styles.progress} 
//                         style={{ transform: `rotate(${category.progress * 1.8}deg)` }}
//                         />
//                     </div>
//                     <div className={styles.progressText}>{category.progress}%</div>
//                     </div>
//                 ) : (
//                     <div className={styles.characterContainer}>
//                     <div className={styles.character}>
//                         <Image
//                         src="/placeholder.svg?height=80&width=80"
//                         alt="Mascot"
//                         width={80}
//                         height={80}
//                         />
//                         <p className={styles.characterText}>
//                         오늘 모든 수업을<br />완료했어요!
//                         </p>
//                     </div>
//                     </div>
//                 )}
//                 <div className={styles.timeline}>
//                     <div className={styles.timelineItem}>
//                     전문장 기본_11.S+V+O+<br />OC 암기테스트
//                     </div>
//                     <div className={styles.timelineItem}>
//                     전문장 기본_11.S+V+O+<br />OC 암기테스트
//                     </div>
//                     <div className={styles.timelineItem}>
//                     전문장 기본_11.S+V+O+<br />OC 암기테스트
//                     </div>
//                 </div>
//                 <a href="#" className={styles.progressLink}>진도표 보기</a>
//                 <button className={styles.startButton}>학습하기</button>
//                 </div>
//             ))}
//             </div>
//         </div>
//         </div>
//     );
// }

