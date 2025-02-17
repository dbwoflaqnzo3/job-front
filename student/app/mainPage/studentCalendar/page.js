'use client';

import { useState, React, useEffect, useRef } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { readPeriodStudentLesson, readSpecificDateLesson } from '@/app/utils/studentCalendarUtil';
import { PageLayout } from '@/app/page.js';

import Image from 'next/image';
import styles from './page.module.css';


=======
import NavBar from '../navigationBar/page.js';
=======
>>>>>>> 8090f42 (feat[#42] : 결제 페이지 1차 제작)
import { readPeriodStudentLesson, readSpecificDateLesson } from '@/app/utils/studentCalendarUtil';
import { PageLayout } from '@/app/page.js';

import Image from 'next/image';
import styles from './page.module.css';

<<<<<<< HEAD
>>>>>>> b6f0872 (feat[#36] : 달력 제작 완료)
=======

>>>>>>> 8090f42 (feat[#42] : 결제 페이지 1차 제작)
export default function StudentCalendar() {

    const today = new Date(); // 현재 날짜 가져오기
    const [date, setDate] = useState([today.getFullYear(), today.getMonth() + 1]); 
    const [selectedDate, setSelectedDate] = useState([today.getFullYear(),today.getMonth()+1,today.getDate()]);
    const [dailyData, setDailyData] = useState([])
    const [detailLoading, setDetailLoading] = useState(true)

    const handleCalnderMY = (signal) => {

        setDate(([year, month]) => {
            let newYear = year;
            let newMonth = month;
    
            if (signal === 0) {
                // 월 감소
                newMonth -= 1;
                if (newMonth < 1) {
                    newMonth = 12;
                    newYear -= 1;
                }
            } else {
                // 월 증가
                newMonth += 1;
                if (newMonth > 12) {
                    newMonth = 1;
                    newYear += 1;
                }
            }
    
            return [newYear, newMonth];
        });
    };

    useEffect(() => {
        readSelectedDateInfo(today.getFullYear(),today.getMonth(),today.getDate())
        setDetailLoading(false)
    },[])

    const handleSelectedDate = (date) => {
        if (!date || !Array.isArray(date) || date.length !== 3) 
            return;
        setSelectedDate(date);
        setDetailLoading(true)
        readSelectedDateInfo(date[0], date[1] - 1, date[2])
    };

    const readSelectedDateInfo = async(year,month,day) => {
        try{
            const date = new Date(year,month,day);
            const result = await readSpecificDateLesson(date)
            setDailyData(result)
        }catch (error) {
            console.error("데이터 불러오기 실패:", error);
        }
    }


    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <PageLayout>
            <div className={styles.pageTitleContainer}>
                <div className={styles.pageTitle}>학습캘린더</div>
            </div>
            <div className={styles.bottomComponentContainer}>
                <div className={styles.calendarContainer}>
                    <Calendar year={date[0]} month={date[1]} selectedDate={selectedDate} changeMonth={handleCalnderMY} changeSelectedDate={handleSelectedDate} />
                </div>
                <div className={styles.dailyDetailContainer}>
                    <DailyDetail month={selectedDate[1]} day={selectedDate[2]} data={dailyData} handleLoading={setDetailLoading} loading={detailLoading}/>
                    {/* <DailyDetail month={12} day={24}/> */}
                </div>
            </div>
        </PageLayout>
=======
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <NavBar/>
                <div className={styles.pageTitleContainer}>
                    <div className={styles.pageTitle}>학습캘린더</div>
                </div>
                <div className={styles.bottomComponentContainer}>
                    <div className={styles.calendarContainer}>
                        <Calendar year={date[0]} month={date[1]} selectedDate={selectedDate} changeMonth={handleCalnderMY} changeSelectedDate={handleSelectedDate} />
                    </div>
                    <div className={styles.dailyDetailContainer}>
                        <DailyDetail month={selectedDate[1]} day={selectedDate[2]} data={dailyData} handleLoading={setDetailLoading} loading={detailLoading}/>
                        {/* <DailyDetail month={12} day={24}/> */}
                    </div>
                </div>
                
            </div>
        </div>
>>>>>>> b6f0872 (feat[#36] : 달력 제작 완료)
=======
        <PageLayout>
            <div className={styles.pageTitleContainer}>
                <div className={styles.pageTitle}>학습캘린더</div>
            </div>
            <div className={styles.bottomComponentContainer}>
                <div className={styles.calendarContainer}>
                    <Calendar year={date[0]} month={date[1]} selectedDate={selectedDate} changeMonth={handleCalnderMY} changeSelectedDate={handleSelectedDate} />
                </div>
                <div className={styles.dailyDetailContainer}>
                    <DailyDetail month={selectedDate[1]} day={selectedDate[2]} data={dailyData} handleLoading={setDetailLoading} loading={detailLoading}/>
                    {/* <DailyDetail month={12} day={24}/> */}
                </div>
            </div>
        </PageLayout>
>>>>>>> 4f9f6d4 (refac[#51] : 수정 1차 완료)
    );
}

export function DailyDetail({month, day, data, handleLoading, loading}) {
    const [distributedData, setDistributedData] = useState({
        1: [], 2: [], 3: [], 4: [], 5: []
    });
    
    const subjectMap = {
        1 : "Vocabulary",
        2 : "Writing",
        3 : "Reading",
        4 : "Listening",
        5 : "Speaking",
    }

    const colorList = ["#FF7207","#00D9AB","#009CD4","#0A5A87","#805E44"]
    
    useEffect(() => {

        const updatedData = { 1: [], 2: [], 3: [], 4: [], 5: [] };

        if (!data || data.length === 0)
            setDistributedData(updatedData)
    
        data.forEach(item => {
            if (updatedData[item.subjectType]) {
                updatedData[item.subjectType].push(item);
            }
        });
    
        setDistributedData(updatedData);
        handleLoading(false)
    }, [data]);

    return(
        <div className={styles.dailyDeatilBody}>
            <div className={styles.detailHeader}>   
                <div className={styles.detailDateContainer}>
                    <div className={styles.detailDate}>
                        {month}월 {day}일
                    </div>
                </div>
                <div className={styles.dailyTotalLessonNumContainer}>
                    <div className={styles.dailyTotalLessonNum}>
                        총 {data.length}개의 수업
                    </div>
                </div>
            </div>
            <div className={styles.dailyDeatilContentContainer}>
                { 
                    loading?
                    <div className={styles.detailLoadingContainer}>
                        <div className={styles.detailLoadingText}>
                            Loading...
                        </div>
                    </div>
                    :
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8090f42 (feat[#42] : 결제 페이지 1차 제작)
                    data.length == 0 ?
                    <div className={styles.detailNoLessonContainer}>
                        <Image
                            src="/images/calendarNoLesson.png"
                            alt="Example Image"
                            width={260}
                            height={260}
                            priority
                        />
                        <div className={styles.detailNoLessonText}>
                            진행할 수업이 없어요!
                        </div>
                    </div>
                    :

<<<<<<< HEAD
=======
>>>>>>> b6f0872 (feat[#36] : 달력 제작 완료)
=======
>>>>>>> 8090f42 (feat[#42] : 결제 페이지 1차 제작)
                    Object.entries(distributedData)
                    .filter(([key, value]) => value.length > 0) // 배열 크기가 0이 아닌 데이터만 필터링
                    .map(([key, value]) => (
                        <div key={key}>
                            <div className={styles.subjectTitleContainer} key={key}>
                                <div className={styles.subjectTitleCircle} style={{backgroundColor: colorList[key-1]}}></div>
                                <div className={styles.subjectTitle}>{subjectMap[key]}</div>
                            </div>
                            {value.map((item,idx) => (
                                <div key={item.lessonId._id} className={ idx === distributedData[key].length-1?  styles.contentContainerLast : styles.contentContainer}>
                                    <div className={item.endDate? styles.contentLeftLectangleDone : styles.contentLeftLectangle}>
                                    </div>
                                    <div className={styles.contentTextContainer}>
                                        <div className={styles.contentText}>
                                            {/* {item.lessonId.lessonNumber}{item.lessonId.lessonName} */}
                                            2025마더텅수능기출문제집영어독해30총정리92회2025마더텅수능기출문제집영어독해30총정리92회2025마더텅수능기출문제집영어독해30총정리92회
                                        </div>
                                    </div>
                                    {
                                        item.endDate?
                                        <div className={styles.contentBtnContainerDone}>
                                            <div className={styles.contentBtnText}>
                                                재학습하기
                                            </div>
                                        </div>
                                        :
                                        <div className={styles.contentBtnContainer}>
                                            <div className={styles.contentBtnText}>
                                                학습하기
                                            </div>
                                        </div>
                                    }
                                </div> // 예시 렌더링
                            ))}
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export function Calendar({ year, month, selectedDate,changeMonth, changeSelectedDate}) {

    const [loading,setLodading] = useState(true)
    const [circleData, setCircleData] = useState([])

    // 특정 달의 시작과 끝 날짜 계산
    const getDaysInMonth = (year, month) => {
        const firstDay = new Date(year, month - 1, 1); // 월은 0부터 시작
        const lastDay = new Date(year, month, 0); // 다음 달의 0번째 날은 이번 달의 마지막 날

        return {
        data : [firstDay, lastDay],
        startDay: firstDay.getDay(), // 해당 달의 첫째 날 요일 (0: 일요일, 1: 월요일 ...)
        days: lastDay.getDate(), // 해당 달의 총 일 수
        };
    };

    const { data, startDay, days } = getDaysInMonth(year, month);

    const fetchData = async (year, month) => {
    
        try {
            const result = await readPeriodStudentLesson(data[0], data[1]);

            setCircleData(result)
            setLodading(false)
        } catch (error) {
            console.error("데이터 불러오기 실패:", error);
        }
    };

    useEffect(()=>{
        fetchData(year, month);
    },[month])


    // 전 달 계산
    const prevMonthDays = getDaysInMonth(
        month === 1 ? year - 1 : year, // 1월이면 전 해로 변경
        month === 1 ? 12 : month - 1 // 전 달
    ).days;

    // 이번 달을 포함한 전체 배열을 만든 후, 5줄 혹은 6줄 결정
    const totalCells = startDay + days;
    const totalRows = totalCells > 35 ? 6 : 5; // 35칸 이하이면 5줄, 36칸 이상이면 6줄
    const totalGridSize = totalRows * 7; // 5줄이면 35칸, 6줄이면 42칸

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1; // 1월이 0부터 시작하므로 +1
    const todayDate = today.getDate();

    // 다음 달의 필요 칸 계산
    const nextMonthDays = totalGridSize - totalCells;

    // 날짜 배열 구성
    const daysArray = [
        // 전 달의 날짜
        ...Array.from({ length: startDay }, (_, i) => ({
            day: prevMonthDays - startDay + i + 1,
            isCurrentMonth: -1,
            isToday: false, // 이전 달의 날짜는 오늘일 수 없음
        })),
        // 이번 달의 날짜
        ...Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            isCurrentMonth: 0,
            isToday: year === todayYear && month === todayMonth && i + 1 === todayDate,
        })),
        // 다음 달의 날짜
        ...Array.from({ length: nextMonthDays }, (_, i) => ({
            day: i + 1,
            isCurrentMonth: 1,
            isToday: false, // 다음 달의 날짜도 오늘일 수 없음
        })),
    ];

    const findMatchingObject = (year, month, day) => {
        // month를 문자열로 변환 후 padStart 사용
        return new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    }
    
    const handleCircleData = (year, month, item) => {
        const date = findMatchingObject(year, month + item.isCurrentMonth, item.day);
    
        // item.date를 Date 객체로 변환하여 비교
        const result = circleData.find(item => new Date(item.date).getTime() === date.getTime())?.containSubjectTypes || [];
    
        return result;
    }
    


    const colorList = ["#FF7207","#00D9AB","#009CD4","#0A5A87","#805E44"]

    const circleCount = 3;

    return (
        <div className={totalCells > 35? styles.calendarBodyExtend : styles.calendarBodyDefault}>
        {
            loading == true &&
            <div className={styles.loadingBody}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8090f42 (feat[#42] : 결제 페이지 1차 제작)
                <Image
                    src="/images/calendarLoading.png"
                    alt="Example Image"
                    width={210}
                    height={210}
                    priority
                />
<<<<<<< HEAD
=======
                <div className={styles.loadingText}>
                    Loading...
                </div>
>>>>>>> b6f0872 (feat[#36] : 달력 제작 완료)
=======
>>>>>>> 8090f42 (feat[#42] : 결제 페이지 1차 제작)
            </div>
        }
        <div className={styles.calendarHeader}>
            <div onClick={() => {changeMonth(0); setLodading(true)}} style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 15 30" fill="none">
                    <path d="M11.935 8.2248L10.6088 6.89981L3.38502 14.1211C3.26857 14.2368 3.17616 14.3744 3.1131 14.5259C3.05004 14.6775 3.01758 14.84 3.01758 15.0042C3.01758 15.1683 3.05004 15.3309 3.1131 15.4824C3.17616 15.634 3.26857 15.7716 3.38502 15.8873L10.6088 23.1123L11.9338 21.7873L5.15377 15.0061L11.935 8.2248Z" fill="#1A1A1A"/>
                </svg>
            </div>
            <div className={styles.calendarMYInfo}>
                <div className={styles.yearText}>{year}</div>
                <div className={styles.monthText}>{month}월</div>
            </div>
            <div onClick={() => {changeMonth(1); setLodading(true)}} style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 15 30" fill="none">
                    <path d="M3.06498 8.2248L4.39123 6.89981L11.615 14.1211C11.7314 14.2368 11.8238 14.3744 11.8869 14.5259C11.95 14.6775 11.9824 14.84 11.9824 15.0042C11.9824 15.1683 11.95 15.3309 11.8869 15.4824C11.8238 15.634 11.7314 15.7716 11.615 15.8873L4.39123 23.1123L3.06623 21.7873L9.84623 15.0061L3.06498 8.2248Z" fill="#1A1A1A"/>
                </svg>
            </div>
        </div>

        <div className={styles.calendarDayContainer}>
            {/* 요일 헤더 */}
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => (
            <div key={index} className={styles.dayHeaderContainer}>
                <div  className={styles.dayText}>
                    {day}   
                </div>
            </div>
            ))}
        </div>

        <div
            className={styles.calendarGrid}
            style={{ gridTemplateRows: `repeat(${totalRows}, 1fr)` }} // 5줄 또는 6줄
        >
            {/* 날짜 출력 */}
            {daysArray.map((item, index) => (
            <div
                onClick={() => { item.isCurrentMonth==0? changeSelectedDate([year,month,item.day]) : changeSelectedDate([year,month+item.isCurrentMonth,item.day])}}
                key={index}
                className={`${styles.day} ${item.isToday? styles.currentMonthToday : styles.currentMonth}`}
            >
                <div className={styles.dateTextContainer}>
                    {
                        selectedDate[1] === (month + item.isCurrentMonth) && selectedDate[2] === item.day && (
                            <div className={styles.selectedDateCircle}></div>
                        )
                    }
                    <div className={item.isCurrentMonth==0? styles.dateTextCurrent : styles.dateTextOther}> 
                        {item.day}
                    </div>
                </div>
                <div className={styles.dateLessonContainer}>
                    {handleCircleData(year,month,item).map((idx,index) => (
                        <div key={idx-1} className={styles.circle} style={{ marginRight: index !== handleCircleData(year,month,item).length - 1 ? "0.25rem" : "0" , backgroundColor : colorList[idx-1]}}></div>
                    ))}
                </div>
                
            </div>
            ))}
        </div>
        </div>
    );
}
