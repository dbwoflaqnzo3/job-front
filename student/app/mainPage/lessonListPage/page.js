'use client'

import styles from './page.module.css';
import { useState, React, useEffect, useRef } from 'react';
import Image from 'next/image';

import { SemiCircleProgress } from 'react-semicircle-progressbar';
import { getMyInfo, getCardInfo } from '../../utils/lessonListUtil'
import { PageLayout } from '@/app/page.js';


export default function LessonListPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [courseExistNum, setCourseExistNum] = useState([0,0,0,0,0])
  const [isInitialSettingDone, setIsInitialSettingDone] = useState(false)
  const [isSecondSettingDone, setIsSecondSettingDone] = useState(false)
  const [cardPosition, setCardPosition] = useState([0,0,0,0,0])
  let check = useRef(false)

  // 전체 수업들
  const [courses, setCourses] = useState({
    vocab: [],
    reading: [],
    writing: [],
    speaking: [],
    listening: [],
  });

  // 카드에 보여줄 최대 3개의 수업들
  const [cardCourses, setCardCourses] = useState({
    vocab: [],
    reading: [],
    writing: [],
    speaking: [],
    listening: [],
  });

  let courseCurriculums = useRef({
    vocab: new Set(),
    reading: new Set(),
    writing: new Set(),
    speaking: new Set(),
    listening: new Set(),
  });

  const [categories, setCategories] = useState([
    { id:1, title: 'Vocabulary', progress: 30 },
    { id:2, title: 'Reading', progress: 30 },
    { id:3, title: 'Writing', progress: 30 },
    { id:4, title: 'Speaking', progress: 30 },
    { id:5, title: 'Listening', progress: 30 }
  ]);

  const lessons = [
    { id: 1, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
    { id: 2, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
    { id: 3, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
    { id: 4, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
    { id: 5, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
    { id: 6, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
    { id: 7, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
    { id: 8, title: '안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습', type: 'BT' },
  ];

  const subjectMap = {
    1: "vocab",
    2: "reading",
    3: "writing",
    4: "speaking",
    5: "listening",
  };

  const monthMap = {
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  };
  
  


  useEffect(() => {
    const fetchData = async() => {
      try{
        const token = document.cookie

        const studentInfo = await getMyInfo()        
        const cardInfo = await getCardInfo(studentInfo._id)

        const updatedCourseExistNum = [...courseExistNum];

        // Iterate through cardInfo
        cardInfo.forEach((item) => {
          if (item.subjectType >= 1 && item.subjectType <= 5) {
            // Increment the corresponding index
            updatedCourseExistNum[item.subjectType - 1]++;
          }
        });

        // Update the state
        setCourseExistNum(updatedCourseExistNum);

        // for (let i = 0; i < cardInfo.length; i++) {
          
        //   const courseFormat = {
        //     studentLessonId: cardInfo[i]._id,
        //     lessonNumber: cardInfo[i].lessonId.lessonNumber,
        //     // lessonName: cardInfo[i].lessonId.lessonName,
        //     lessonName: "영어 공부좀 해라 왠수야",
        //     allocatedDate: cardInfo[i].allocatedDate,
        //   };
          
        //   const subjectKey = subjectMap[cardInfo[i].subjectType];
            
        //   if (subjectKey) {
        //     setCourses((prev) => {
        //       const updatedCourses = [...prev[subjectKey], courseFormat];
        
        //       // lessonNumber로 오름차순 정렬
        //       updatedCourses.sort((a, b) => a.lessonNumber - b.lessonNumber);
        
        //       return {
        //         ...prev,
        //         [subjectKey]: updatedCourses,
        //       };
        //     });
        //   }
        // }

        //max 30자
        for (let i = 0; i < cardInfo.length; i++) {

          const date = new Date(cardInfo[i].allocatedDate);
          const day = date.getDate(); // 일(day)만 얻음

          const courseFormat = {
            curriculumId : cardInfo[i].curriculumId,
            dataId : cardInfo[i].dataId,
            studentLessonId: cardInfo[i]._id,
            lessonNumber: cardInfo[i].lessonId.lessonNumber,
            lessonName: "영어 공부좀 해라 왠수야",
            allocatedDate: cardInfo[i].allocatedDate,
            day : day,
          };
        
          const subjectKey = subjectMap[cardInfo[i].subjectType];
          if (subjectKey) {
            setCourses((prev) => {
              const updatedCourses = [...prev[subjectKey], courseFormat];
        
              // 중복 제거: studentLessonId 기준으로 고유 값만 남김
              const uniqueCourses = updatedCourses.filter(
                (course, index, self) =>
                  index ===
                  self.findIndex((c) => c.studentLessonId === course.studentLessonId)
              );
        
              // lessonNumber로 오름차순 정렬
              uniqueCourses.sort((a, b) => a.lessonNumber - b.lessonNumber);
        
              return {
                ...prev,
                [subjectKey]: uniqueCourses,
              };
            });
          }
        }
        

        setIsInitialSettingDone(true)

      }catch(e) {
        setErrorMessage(e)
        console.log(e)
      }
    }

      fetchData()

  },[])

  useEffect(() => {

    if(isInitialSettingDone)
    {
      handlePercentage()
      handleCourseCurriculum()

      if(isSecondSettingDone)
      {
        for(let i = 0; i < 5; i ++)
        {
          handleCardCourses(i+1,0)
        }
      }
    }

  },[isInitialSettingDone,isSecondSettingDone])

  const handleCourseCurriculum = () => {
      
    if(!Array.isArray(courseCurriculums.current[subjectMap[1]]))
    {
      for (let i = 0; i < 5; i++) {
        const subjectKey = subjectMap[i + 1]; // 현재 subjectKey 추출
        const currentCourses = courses[subjectKey]; // 현재 subject의 courses 추출
      
        currentCourses.forEach((course) => {
          courseCurriculums.current[subjectKey].add(course.curriculumId); // 중복 확인 없이 추가
        });
      }
  
  
      // // 필요 시 배열로 변환
      Object.keys(courseCurriculums.current).forEach((key) => {
        courseCurriculums.current[key] = Array.from(courseCurriculums.current[key]);
      });
  
      setIsSecondSettingDone(true)
    }
  }

  const handlePercentage = () => {
    setCategories((prevCategories) => {
      return prevCategories.map((category, i) => {
        let cnt = 0;

        for (let j = 0; j < courses[subjectMap[i + 1]].length; j++) {
          const nk = courses[subjectMap[i + 1]][j];
          if (nk.endDate === null || new Date(nk.endDate) >= new Date()) {
            cnt += 1;
          }
        }

        return {
          ...category,
          progress: cnt / courses[subjectMap[i + 1]].length,
        };
      });
    });
  }

  const handleCardPosition = (subject, req) => {

    let position
    
    setCardPosition((prevPositions) => {
      // 현재 subject의 position 값 가져오기
      const currentPosition = prevPositions[subject - 1]; // subject는 1~5, 배열 index는 0~4
      const maxLength = courseCurriculums.current[subjectMap[subject]].length; // 해당 subject의 최대 길이
  
      // 새 position 계산
      let newPosition = currentPosition;
  
      if (req === 0) {
        // 다음으로 이동
        newPosition = Math.min(currentPosition + 1, maxLength - 1); // 최대값 초과 방지
      } else if (req === 1) {
        // 이전으로 이동
        newPosition = Math.max(currentPosition - 1, 0); // 0 미만 방지
      }

      position = newPosition
  
      // 기존 배열 복사 및 position 업데이트
      const updatedPositions = [...prevPositions];
      updatedPositions[subject - 1] = newPosition;
      return updatedPositions;
    });

    handleCardCourses(subject, position)

  };

  const handleCardCourses = (subject,position) => {

    const now = new Date();


    const filterCurriculumId = courseCurriculums.current[subjectMap[subject]][position];
    const filteredCourses = courses[subjectMap[subject]].filter(course => course.curriculumId === filterCurriculumId);

    for (let i = 0; i < filteredCourses.length; i++) {
      const { subjectType, _id, allocatedDate } = filteredCourses[i];
      // const {lessonName, lessonNumber} = filteredCourses[i].lessonId
      const studentLessonId = _id
      const lessonNumber = filteredCourses[i].lessonNumber
      const lessonName = "영어ㄱ공부좀해라ㄱ"
      

      // 조건 확인: allocatedDate가 null이 아니거나 당일 포함인 경우
      if (allocatedDate !== null || new Date(allocatedDate) >= now) {
        const subjectKey = subjectMap[subject]; // subjectType으로 배열 결정

        if (subjectKey) {
          setCardCourses((prev) => {
            const updatedArray = [...prev[subjectKey]];
  
            // 배열 크기가 3 미만일 때만 추가
            if (updatedArray.length < 3) {
              updatedArray.push({ studentLessonId, allocatedDate, lessonName, lessonNumber });
            }
  
            return {
              ...prev,
              [subjectKey]: updatedArray,
            };
          });
        }
      }
    }

  }


  const monthMaker = (subjectType) => {
    let monthList = [];
    let box_cnt = [];
    let box_size = [];
  
    // courses[subjectMap[subjectType]] 배열 탐색
    for (let i = 0; i < courses[subjectMap[subjectType]].length; i++) {
      // allocatedDate에서 month 추출
      const allocatedDate = new Date(courses[subjectMap[subjectType]][i].allocatedDate);
      const month = allocatedDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
  
      // monthList에 month가 있는지 확인
      const monthIndex = monthList.indexOf(month);
  
      if (monthIndex === -1) {
        // month가 없으면 추가하고, box_cnt에 1 추가
        monthList.push(month);
        box_cnt.push(1);
      } else {
        // month가 이미 있으면 해당 index의 box_cnt 값을 증가
        box_cnt[monthIndex] += 1;
      }
    }

    for(let i = 0; i < box_cnt.length; i++)
    {
      box_size.push(54*box_cnt[i]+25*(box_cnt[i]-1))
    }


  
    // JSX 생성 및 반환
    return monthList.map((month, index) => (
      <span key={index} className={styles.month} style={{height : box_size[index]}}>
        <div className={styles.monthText}>{`${month}월`}</div>
        <div className={styles.monthEngText}>{`${monthMap[month]}`}</div>
      </span>
    ));
  };
  

  return (
    <PageLayout>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>학습하기</h1>
        </div>
        <div className={styles.cardContainer}>
          {categories.map((category, index) => (
            <div key = {index}>
            <div key={index} className={styles.card} >
              <div className={styles.cardTitleContainer}>
                <div className={styles.cardPositionBtn} onClick={() => handleCardPosition(index + 1, 0)}>{"<"}</div>
                <h2 className={styles.cardTitle}>{category.title}</h2>
                <div className={styles.cardPositionBtn} onClick={() => handleCardPosition(index + 1, 1)}>{">"}</div>
              </div>
              <div className={styles.imageContainer} style={{ display: courseExistNum[index] != 0 ? "none" : "flex" }}>
                <Image
                  src="/images/lessonDone.png"
                  alt="Example Image"
                  width={150}
                  height={150}
                  priority
                />
                <div className={styles.imageText}>오늘 모든 수업을<br/>완료했어요!</div>
              </div>
              <div className={styles.progressContainer} style={{ display: courseExistNum[index] != 0 ? "flex" : "none" }}>  
                <SemiCircleProgress
                  percentage={categories[index].progress}
                  size={{
                    width: 200,
                    height: 200,
                  }}
                  strokeWidth={10}
                  strokeColor="#0084D0"
                  hasBackground={true}
                  bgStrokeColor='#CBE6F5'
                />
              </div>
              <div className={styles.timelineContainer} style={{ display: courseExistNum[index] != 0 ? "flex" : "none" }}>
                <div className={styles.timelineLeftImage}>
                  <div className={styles.firstCircle}>
                    <div className={styles.innerCircle}></div>
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.line}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.square}></div>
                </div>
                <div className={styles.timelineItemContainer} >
                {
                    cardCourses[subjectMap[index + 1]]
                      .map((course, idx, arr) => (
                        <div
                          key={idx}
                          className={
                            idx === arr.length - 1
                              ? styles.timelineItemLast // 마지막 요소일 때
                              : styles.timelineItem // 일반 요소일 때
                          }
                          style={{color : idx == 0? "#1A1A1A" : "#999999"}}
                          
                        >
                          <div className={styles.timelineItemText}>{`UNIT ${course.lessonNumber}. ${course.lessonName}`}</div>
                        </div>
                      ))
                }

                </div>
              </div>
              <div className={courseExistNum[index]? styles.progressLinkContainer : styles.progressLinkContainerDisable} onClick={() => setSelectedCategory(category)}>
                <a href="#" className={courseExistNum[index]? styles.progressLink : styles.progressLinkDisable} >진도표 보기</a>
              </div>
            </div>
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
                  X
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.lessonContainer}>
                    <div className={styles.monthContainer}>
                      {monthMaker(selectedCategory.id)}
                    </div>
                    <div className={styles.lessonList} >
                      {courses[subjectMap[selectedCategory.id]].map((lesson) => (
                          <div key={lesson.studentLessonId} className={styles.lessonItem}>
                            
                            <span className={styles.lessonNumber}>{lesson.day}</span>

                            <div className = {styles.lessonInfoContainer}>
                              <span className={styles.lessonTitle}>안녕하세요제이름은반대준입니다님이름은무엇인가요저는집에가고싶습</span>{/*{lesson.title}*/}
                            </div>
                            <div className = {styles.lessonBtnContainer}>
                              <button className={styles.lessonButton}>학습하기</button>
                            </div>
                          </div>
                      ))}
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}

    </PageLayout>
  );
}



