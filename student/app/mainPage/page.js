'use client'

import styles from './page.module.css';
import { PageLayout } from '@/app/page';
import { Button1, Button3, Button4 } from "@/app/components/ui/buttons/Regular";
import { useRouter } from 'next/navigation';
import Card from '../components/ui/Card.js';
import { CircularGraph } from '../components/ui/CircularGraph.js';
import Image from 'next/image';
import { readStudentInfo } from '@/app/utils/studentInfoUtil';


import { useEffect, useState, useRef } from 'react';
import { getUserInfo } from "../utils/mainPageUtil.js"



export default function MainPage() {

  const [userName, setUserName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [userInfo, setUserInfo] = useState({}) // 유저 정보를 저장하는 object 상태
  const [initDone, setInitDone] = useState(false)
  let updateDone = useRef(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie; // Read cookies

        const result = await getUserInfo(token)

        setUserId(result.name)

      } catch (e) {

      }
    }

    fetchUserData()
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultUserInfo = await readStudentInfo()

        setUserInfo(resultUserInfo)

        setInitDone(true)
        // console.log(typeof(resultUserInfo), "-----")
      } catch (err) {
        setErrorMessage(err.message); // 오류 발생 시 상태에 오류 메시지 저장
        console.log("학생 데이터 fetch 에러 :", { err })
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    if (initDone) {
      // 기존 userInfo에서 원하는 값들만 가공하여 updateBody에 담습니다.
      let updateBody = {
        birthDate: userInfo.birthDate.slice(0, 10),
        phoneNumber: userInfo.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
        parentNumbers: userInfo.parentNumbers.map(number =>
          number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
        ),
        email: userInfo.email,
        userId: userInfo.userId
      };

      if (userInfo.sex == "Male") {
        updateBody.sex = "남"
      } else if (userInfo.sex == "Female") {
        updateBody.sex = "여"
      }

      setUserName(userInfo?.name || "학생 정보 없음")
      setTeacherName(userInfo?.teacherId?.name || "정보 없음")


      // updateBody를 기존 상태와 병합하여 업데이트합니다.
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        ...updateBody
      }));

      updateDone.current = true
      setInitDone(false)
    }
  }, [initDone]);



  const handleStartStudy = () => {
    router.push("/mainPage/lessonListPage")
  }

  return (
    <PageLayout>
      <div className={styles.wrapper}>
        <div className={styles.leftContainer}>
          <MySmallInfo student={userName} teacher={teacherName} />
          <p className={`${styles["leftInstruction"]} ko-sb-30`}>오늘 이만큼 했어요 !</p>
          <ProgressCard progressPercent={75} />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.homeTextContainer}>
            <p className={`${styles["sentenceEng"]} en-sb-20`}>Do you know DaeJun Ban, the GOAT?</p>
            <p className={`${styles["sentenceKor"]} ko-sb-18`}>반대준은 신이야</p>
          </div>
          <Image
            src="/assets/images/homepage.svg"
            alt="HOME"
            width={759}
            height={536}
          />
          <div className={styles.rightBtnContainer}>
            <Button3 text="학습하기" onClick={handleStartStudy} width={330} />
            <Button1 text="복습하기" onClick={''} disabled width={330} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function MySmallInfo({ student, teacher }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const cookies = document.cookie;

      const response = await fetch('http://localhost:8080/userToken/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();

      console.log(result)

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
  }

  const handleMyInfo = () => {
    router.push('/mainPage/myInfo');
  }

  return (
    <Card margin={0} height={192} width={448} padding={24} border>
      <div className={styles.nameContainer}>
        <p className={`${styles["studentName"]} ko-md-24`}>{student}님</p>
        <p className={`${styles["teacherName"]} ko-md-17`}>{teacher} 선생님</p>
      </div>
      <div className={styles.btnContainer}>
        <Button1 text="내 정보 수정" onClick={handleMyInfo} width={188} height={54} />
        <Button4 text="로그아웃" onClick={handleLogout} width={188} height={54} />
      </div>
    </Card>
  )
}

function ProgressCard(progressPercent) {

  return (
    <Card margin={0} height={332} width={448} border>
      <CircularGraph percentage={progressPercent} />
      <p>잘하고 있어요 !</p>
    </Card>
  )
}