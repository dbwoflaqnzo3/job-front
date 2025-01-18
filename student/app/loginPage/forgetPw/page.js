'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from '../forgetPw/page.module.css'

/*
  인증 로직 구현
  1. 이메일 입력
    1) 이메일 입력값이 null인 경우  S
      - 인증 메일 전송 안함
      - 이메일 주소가 유효하지 않다고 알림
    2) 이메일이 존재하지 않는 경우  S
      - 존재하지 않는 이메일입니다. 
      - 인증 오류 시 xxx-xxxx로 문의 달라고 알림.
    3) 유효한 이메일일 경우        S
      - 인증 메일 전송
      - 모달 표시
  2. 인증 모달
    1) 인증 번호 입력 실패
      - 유효하지 않은 인증 번호라고 알림
    2) 인증 시간 초과
      - 인증 번호 입력 창 비활성화
      - 인증 시간이 초과되었다고 알리고 취소 버튼을 누르도록 유도
      - 인증 시간 자리에 재전송 버튼 활성화 
    3) 인증 취소 버튼 클릭
      - 기존 저장 모달 계속 표시
    4) 재전송 버튼 클릭
      - 시간이 초기화되며 인증 번호 재전송
      - 메시지로 재전송되었다고 알림
    5) 인증 성공 시
      - 비밀번호 변경 페이지로 이동
  3. 새로 고침 시
    1) 기존에 인증 정보가 없을 경우
      - 원래대로 진행
    2) 기존 인증 정보가 있고 만료 시간 초과가 안됐을 경우
      - setTimeLeft => 만료 시간 - 현재 시간
    3) 기존 인증 정보가 있고 만료 시간 초과됐을 경우
      - 만료 여부 true로 변경
      - 재인증 버튼 활성화
*/
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

  //인증 timer
  const [initialTime, setInitialTime] = useState(sessionStorage.getItem('expireDate')) // 저장된 만료 시간 불러오기
  const [timeLeft, setTimeLeft] = useState(0); // timer 남은 시간 (초 단위)
  const [isExpiredTime, setIsExpoiredTime] = useState(false)
  const [checkDuplication, setCheckDuplication] = useState(false)

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

        setIsExpoiredTime(false)

        // 중복 전송 시
        if(response.status === 400){

          const now = new Date(Date.now())

          // 인증 요청이 만료됐을 때
          if(now > initialTime){
            sessionStorage.setItem('expireDate', null)
            setIsExpoiredTime(true)
          }
          else{
            const t = initialTime - now 
            setTimeLeft(Math.floor(t/1000))
            setCheckDuplication(true)
          }

        } else { // 정상적인 인증 요청

          // if (!response.ok) {
          //   setError(result.message || '이메일 인증 실패');
          //   console.log(error)
          // }

          const { result } = await response.json()


          setVerificationResponseId(result)
  
          //이메일 전송 성공
          setMessage(`인증 메일이 ${fullEmail}로 전송되었습니다.`)
  
          // 처음으로 이메일 인증할 때
          const expireDate = new Date(Date.now() + 3 * 60 * 1000)
          sessionStorage.setItem('expireDate', expireDate)
          setInitialTime(expireDate)
          setTimeLeft(180)

        }
      
      setMessage(null)
      setModalOpen(true)

    } catch (error) {
      console.error(error)
    }

  }

  // 타이머 업데이트
  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsExpoiredTime(true)
            return 0
          }
          return prev - 1
        });
      }, 1000)

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
    if (e.target.value === "") {
      setIsUserInput(true)
    }
    else {
      setIsUserInput(false)
    }
  }

  // 함수 명 변경 요망
  const verifyId = async () => {

    try{

      console.log(verificationResponseId, inputVerificationNum)
      
      if(inputVerificationNum === ''){
        setMessage("인증 번호를 입력해 주세요.");
        return;
      }

       const response = await fetch('http://localhost:8080/verifyService/verify', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: verificationResponseId,
          code: inputVerificationNum
        })
      })

      if (!response.ok) {
        setMessage("서버 요청 실패: ");
        return;
      }

      const {result} = await response.json()
      const verifyInfo = result.result
      
      if(response.status === 404 || verifyInfo.status === 2){
        setMessage("만료된 요청입니다. 요청을 재전송해주세요.")
        return
      }else if(verifyInfo.status === 0){
        setMessage("잘못된 인증번호입니다.")
        return
      }else if(verifyInfo.status === 1){
        router.push('../loginPage/changePw')
      }
    } catch (error) {
      console.error(error)
    }
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

      {/* 인증 번호 확인 모달 */}
      {
        modalOpen && 
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            {
              !checkDuplication ? 
                <h2 className={styles.modalTitle} >작성하신 이메일로 인증번호가 발송되었어요.</h2>
                :
                <h2 className={styles.modalTitle} >전송된 이메일 코드를 입력해 주세요.</h2>
            }
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                value={inputVerificationNum}
                maxLength={maxLength}
                disabled={isExpiredTime}
                onChange={(e) => setInputVerificationNum(e.target.value)}
              />
              {message && <p className={styles.message}>{message}</p>}
              {
                isExpiredTime 
                ? <button onClick={handleSubmit}>재전송</button>
                : <p>{formatTime(timeLeft)}</p>

              }
            <div className={styles.buttonGroup}>
              <button className={styles.buttonConfirm} onClick={verifyId}>인증번호 확인</button>
              <button className={styles.buttonCancel} onClick={() => setModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      }

      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
