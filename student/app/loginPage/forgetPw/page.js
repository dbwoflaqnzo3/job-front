'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from '../forgetPw/page.module.css'

export default function ForgetPw() {

  const [emailId, setEmailId] = useState("") // 이메일 @ 앞부분
  const [selectedOption, setSelectedOption] = useState("") // 이메일 @ 뒷부분
  const [message, setMessage] = useState("")
  const [error, setError] = useState('')
  const [verificationResponseId, setVerificationResponseId] = useState(null)
  const [isUserInput, setIsUserInput] = useState(true) //직접 입력 선택 관리

  //인증 확인 모달
  const [modalOpen, setModalOpen] = useState(false)
  const [inputVerificationNum, setInputVerificationNum] = useState('')
  const maxLength = 8 //인증 번호 최대 숫자 자리
  const [modalMessage, setModalMessage] = useState('')

  //인증 timer
<<<<<<< HEAD
  const initialTime = 180
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 (초 단위)
=======
  const [timeLeft, setTimeLeft] = useState(0); // timer 남은 시간 (초 단위)
  const [isExpiredTime, setIsExpiredTime] = useState(false)
  const [expireDate, setExpireDate] = useState(null)
  const [checkDuplication, setCheckDuplication] = useState(false)
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)

  const router = useRouter()

  const options = ["naver.com", "gmail.com", "daum.net"]

  // 인증 시간 관리
  useEffect(() => {

    let interval

      if (timerActive) {
        interval = setInterval(() => {
          setVerifyTIme((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
        }, 1000)
      }

      // 컴포넌트 언마운트 시 정리
      return () => clearInterval(interval)

  }, [timerActive])

  //time 표기 형식 변형형
  // const FormatTime = (time) => {
	// 	const minutes = Math.floor(time / 60)
	// 	const seconds = time % 60
	// 	return (
  //     <div>
  //       <p>{`${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`}</p>
  //     </div>
  //   )
	// }

  //재전송 클릭 시 timer 초기화
  const resetTimer = () => {
    setVerifyTIme(initialTime);
    setTimerActive(true);
  };

  //변경하기 버튼 클릭 
  const handleSubmit = async (e) => {
    
    e.preventDefault()
<<<<<<< HEAD

>>>>>>> 3fe6d00 (feat[#26] : forget pw 이메일 전송, 인증 모달 구현 (timer 제외))
=======
    setModalOpen(false)
  
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)
    //이메일 형식이 틀렸을 경우
    if (!emailId || !selectedOption) {
      setMessage("이메일을 올바르게 입력해주세요.")
      return
    }

    const fullEmail = `${emailId}@${selectedOption}`
    setMessage(`인증 메일이 ${fullEmail}로 전송되었습니다.`)

    //이메일 인증 코드 전송
    try {

          const response = await fetch('http://localhost:8080/verifyService/create', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: fullEmail }),
        })

        // 이메일 정보가 없을 시 
        if(response.status === 404){
          setMessage("등록된 이메일을 찾을 수 없습니다.\n인증 오류가 있을 경우 xxx-xxxx로 문의주시기 바랍니다.")
          return
        }

        setIsExpiredTime(false)

        const { result, resExpireDate } = await response.json() //생성된 ID, 만료 시간 불러오기
        console.log(resExpireDate, "만료 시간")

        const now = new Date(Date.now()) // 현재 시간 설정
        const expireDate = new Date(resExpireDate) // 만료 시간 설정 
        setExpireDate(expireDate)
        setVerificationResponseId(result) // studentId 저장 

        // 중복 전송 시
        if(response.status === 400){

          // 인증 요청이 만료됐을 때
          if(now > result){
            setIsExpiredTime(true)
          }
          else{
            setTimeLeft(Math.floor((expireDate - now) / 1000))
            setCheckDuplication(true)
          }
        } else { // 정상적인 인증 요청

          // 이메일 인증 기본 시간 설정
          setTimeLeft(Math.floor((expireDate - now) / 1000))

        }

        setMessage(null)
        setModalOpen(true)

    } catch (error) {
      console.error(error)
    }
    // router.push('../loginPage/changePw')

  }

  // 타이머 업데이트
  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const now = new Date(Date.now())
          if (prev <= 1) {
            clearInterval(interval)
            setIsExpiredTime(true)
            return 0
          }
          return Math.floor((expireDate - now) / 1000)
        });
      }, 100)

      return () => clearInterval(interval) // 컴포넌트 언마운트 시 클리어
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
    if(e.target.value === ""){
      setIsUserInput(true)
    }
    else{
      setIsUserInput(false)
    }
  }

<<<<<<< HEAD
  // 함수 명 변경 요망망
  const endWritingStudy = () => {

=======
  // 
  const verifyId = async (e) => {

    e.preventDefault()

    try{

      console.log(verificationResponseId, inputVerificationNum, "인증 아이디 및 입력 코드")
      
      if(inputVerificationNum === ''){
        setModalMessage("인증 번호를 입력해 주세요.");
        return;
      }

       const response = await fetch('http://localhost:8080/verifyService/verify', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: verificationResponseId,
          code: inputVerificationNum
        })
      })

      if(response.status === 404){
        setModalMessage("만료된 요청입니다. 요청을 재전송해주세요.")
      }

      const verifyInfo = await response.json()
      
      if(verifyInfo.status === 2){
        setModalMessage("만료된 요청입니다. 요청을 재전송해주세요.")
        return
      }else if(verifyInfo.status === 0){
        setModalMessage("잘못된 인증번호입니다.")
        return
      }else if(verifyInfo.status === 1){
        localStorage.setItem("id", verifyInfo.studentId)
        router.push('/../loginPage/changePw')

      }
    } catch (error) {
      console.error(error)
    }
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비밀번호 변경하기</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div>
            <p className={styles.inputTitle} >인증 가능한 이메일 주소를 입력하세요.</p>
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
<<<<<<< HEAD
=======
              {modalMessage && <p className={styles.message}>{modalMessage}</p>}
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)
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
