'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from '../forgetPw/page.module.css'

export default function ForgetPw() {
  const [selectedOption, setSelectedOption] = useState("")
  const [emailId, setEmailId] = useState("") // 이메일 @ 앞부분
  const [message, setMessage] = useState("")
  const [error, setError] = useState('')
  const [verificationRequestId, setVerificationRequestId] = useState(null)
  const [isUserInput, setIsUserInput] = useState(true) //직접 입력 선택 관리

  //인증 확인 모달
  const [modalOpen, setModalOpen] = useState(false)
  const [inputVerficationNum, setInputVerficationNum] = useState('')
  const maxLength = 8 //인증 번호 최대 숫자 자리리

  //인증 timer
  const initialTime = 180
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 (초 단위)

  const router = useRouter()

  const options = ["naver.com", "gmail.com", "daum.net"]


  //변경하기 버튼 클릭 
  const handleSubmit = async (e) => {
    e.preventDefault()

    //이메일 형식이 틀렸을 경우
    if (!emailId || !selectedOption) {
      setMessage("이메일을 올바르게 입력해주세요.")
      return
    }

    const fullEmail = `${emailId}@${selectedOption}`
    setMessage(`인증 메일이 ${fullEmail}로 전송되었습니다.`)

    //이메일 인증 코드 전송 
    try {

      // const response = await fetch('http://localhost:8080/verifyService/create', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email: fullEmail }),
      // })

      // const { result } = await response.json();

      // if (!response.ok) {
      //   setError(result.message || '이메일 인증 실패');
      //   console.log(error)
      // } else {
      //   setVerificationRequestId(result.result)
      //   setTimeLeft(initialTime)
      //   setModalOpen(true)
      // }

      setTimeLeft(initialTime)
      setModalOpen(true)

      console.log(verificationRequestId, "request ID !!")

    } catch (error) {
      setError('서버와의 연결 문제로 로그인에 실패했습니다.');
      console.error(error)
    }
    // router.push('../loginPage/changePw')

  }

  // 타이머 업데이트
  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setMessage("Token has expired.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
    }
  }, [timeLeft])

  // 남은 시간을 분:초 형식으로 변환
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  //이메일 @ 뒷자리 선택 함수
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
    console.log(e.target.value)
    if (e.target.value === "") {
      setIsUserInput(true)
    }
    else {
      setIsUserInput(false)
    }
  }

  // 함수 명 변경 요망망
  const endWritingStudy = () => {

  }

  return (
    <div className={styles.container}>
      <h1>비밀번호 변경하기</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div>
            <p>인증 가능한 이메일 주소를 입력하세요.</p>
          </div>
          <div className={styles.emailBox}>
            <input
              type="text"
              placeholder="example"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <span>@</span>
            <input
              type="text"
              placeholder="직접입력"
              value={selectedOption}
              disabled={!isUserInput}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <select
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">직접 입력</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          인증하기
        </button>
      </form>
      {
        modalOpen && 
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle} >작성하신 이메일로 인증번호가 발송되었어요.</h2>
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                value={inputVerficationNum}
                // maxLength={maxLength}
                onChange={(e) => setInputVerficationNum(e.target.value)}
              />
              {
                timeLeft > 0 && (
                  <p>{formatTime(timeLeft)}</p>
                )
              }
            <div className={styles.buttonGroup}>
              <button className={styles.buttonCancel} onClick={endWritingStudy}>인증번호 확인</button>
              <button className={styles.buttonConfirm} onClick={() => setModalOpen(false)}>다음에 하기</button>
            </div>
        </div>
      </div>
      }
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
