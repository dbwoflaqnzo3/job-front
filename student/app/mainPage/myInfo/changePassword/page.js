'use client'

import { useState, useEffect } from 'react';
import { verifyStudentPassword, changePassword } from '@/app/utils/changePasswordUtil'; // verifyStudentPassword 함수 import
import { readStudentInfo } from '@/app/utils/studentInfoUtil';
import { PageLayout } from '@/app/page';
import { Button1 } from "@/app/components/ui/buttons/Regular";
import { Validator, ValidatorType } from "@/app/utils/validator";
import { useRouter } from 'next/navigation';
import { Column } from "@/app/widgets/structure/Grid";
import TextField from "@/app/components/ui/TextField";
import styles from "./page.module.css";
import SizedBox from "@/app/widgets/structure/SizedBox";
import DynamicIcon from "@/app/components/ui/image/DynamicIcon";

export default function ChangePassword() {
  const router = useRouter();
  const [checkPassword, setCheckPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputNewPasswordCheck, setInputNewPasswordCheck] = useState('');
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({}) // 유저 정보를 저장하는 object 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultUserInfo = await readStudentInfo()

        setUserInfo(resultUserInfo)

        // console.log(typeof(resultUserInfo), "-----")
      } catch (err) {
        setErrorMessage(err.message); // 오류 발생 시 상태에 오류 메시지 저장
        console.log("학생 데이터 fetch 에러 :", { err })
      }
    };

    fetchData();

  }, []);

  // TextField에 입력한 비밀번호를 verifyStudentPassword로 검증하는 함수
  const handlePasswordSubmit = async () => {
    try {
      const result = await verifyStudentPassword(inputPassword);
      if (result == 200) {
        setCheckPassword(true);
        setStudentInfo(result);
      } else {
        setError("비밀번호가 틀렸습니다.");
      }
    } catch (err) {
      setError(err.message);
      console.error("비밀번호 검증 에러:", err);
    }
  };

  const changePasswordSubmit = async () => {
    if (inputNewPassword === inputNewPasswordCheck) {
      try {
        const result = await changePassword(inputNewPassword);
        if (result == 200) {
          console.log('비번 변경 성공')
          router.push('/mainPage/myInfo');
        } else {
          setError("비밀번호가 틀렸습니다.");
        }
      } catch (err) {
        setError(err.message);
        console.error("비밀번호 검증 에러:", err);
      }
    }
  }

  function toMyInfo() {
    router.push('/mainPage/myInfo')
  }

  return (
    <PageLayout hide={true}>
      <button className={styles.backButton} onClick={toMyInfo}><DynamicIcon icon={"arrowLeft"} size={38} /></button>
      {
        !checkPassword ? (
          <div className={styles.container1}>
            <p className={styles.title1}>비밀번호 변경하기</p>
            <p className={styles.instruction1}>기존 비밀번호를 작성해주세요</p>
            <TextField
              type="password"
              placeholder="비밀번호/Password"
              value={inputPassword}
              onChange={setInputPassword}
              error={error}
              stretch
            />
            <div className={styles.space} />
            <Button1 text="확인하기" onClick={handlePasswordSubmit} stretch />
          </div>
        ) : (

          <div className={styles.container1}>
            <div className={`page ${styles["password"]}`}>
              <div className={styles["container"]}>
                <Column gap={60}>
                  <h3 className={`${styles["title"]} ko-sb-30`}>비밀번호 변경하기</h3>
                  <Column gap={41}>
                    <Column>
                      <h4 className="ko-md-17">새 비밀번호를 작성해주세요</h4>
                      <TextField
                        type="password"
                        placeholder="비밀번호/Password"
                        onChange={setInputNewPassword}
                        validators={[
                          new Validator(ValidatorType.AT_LEAST_EIGHT, "비밀번호는 최소 8자리 이상이어야 합니다"),
                          new Validator(ValidatorType.INCLUDE_ALPHABET_SPECIAL_CHAR_NUMBER, "영문/특수문자/숫자가 포함되어야 합니다"),
                          new Validator(ValidatorType.SEQUENTIAL_NUMBER_CHAR, "연속된 숫자/문자는 사용이 불가합니다"),
                        ]}
                        stretch
                      />
                    </Column>
                    <Column>
                      <h4 className="ko-md-17">한 번 더 작성해주세요</h4>
                      <TextField
                        type="password"
                        placeholder="비밀번호/Password"
                        onChange={setInputNewPasswordCheck}
                        validators={[new Validator(inputNewPassword, "아이디/비밀번호가 일치해야 합니다")]}
                        // showMismatchOnly
                        stretch
                      />
                    </Column>
                  </Column>
                </Column>
                <SizedBox height={162} />
                <Button1 text="저장하기" onClick={() => { changePasswordSubmit() }} stretch />
              </div>
            </div>
          </div>
        )
      }
    </PageLayout >
  )
}