'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from '../forgetPw/page.module.css'

export default function ForgetPw() {
  const [selectedOption, setSelectedOption] = useState("")
  const [emailId, setEmailId] = useState("") // 이메일 @ 앞부분
  const [message, setMessage] = useState("")
  const [error, setError] = useState('');
  const [verificationRequestId, setVerificationRequestId] = useState(null)
  const [isUserInput, setIsUserInput] = useState(true) //직접 입력 선택 관리

  //인증 확인 모달달
  const [modalOpen, setModalOpen] = useState(false) 
  const [inputVerficationNum, setInputVerficationNum] = useState('')

  //인증 timer
  const initialTime = 180
  const [verifyTime, setVerifyTIme] = useState(initialTime)
  const [timerActive, setTimerActive] = useState(false)

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

    //이메일 형식이 틀렸을 경우
    if (!emailId || !selectedOption) {
      setMessage("이메일을 올바르게 입력해주세요.")
      return
    }

    const fullEmail = `${emailId}@${selectedOption}`
    setMessage(`인증 메일이 ${fullEmail}로 전송되었습니다.`)

    //이메일 인증 코드 전송 
    try{

      const response = await fetch('http://localhost:8080/verifyService/create', {
        method : "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: fullEmail }),
      })

      const {result} = await response.json();

      if(!response.ok){
        setError(result.message || '이메일 인증 실패');
        console.log(error)
      }else{
        setVerificationRequestId(result.result)
      }

      console.log(verificationRequestId, "request ID !!")

    } catch(error){
      setError('서버와의 연결 문제로 로그인에 실패했습니다.');
      console.error(error)
    } 

    setModalOpen(true)
    setTimerActive(true)

    // router.push('../loginPage/changePw')
    
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

  // 함수 명 변경 요망망
  const endWritingStudy = () => {

  } 

  // 인증 확인 modal
  const VerifyModal = () => {
    return(
      <div className={styles.modalOverlay}> 
            <div className={styles.modalContainer}>
                <h2 className={styles.modalTitle} >작성하신 이메일로 인증번호가 발송되었어요.</h2>
                <p className={styles.modalDescription} >종료하시면 이전 단계까지 저장됩니다.</p>
                <input 
                    type="text"
                    placeholder="인증번호를 입력하세요"
                    value={inputVerficationNum}
                    // disabled
                    onChange={(e) => setInputVerficationNum(e.target.value)}
                  />
                <p>{verifyTime}</p>
                <div className={styles.buttonGroup}>
                  <button className={styles.buttonCancel} onClick={endWritingStudy}>인증번호 확인</button>
                  <button className={styles.buttonConfirm} onClick={() => setModalOpen(false)}>다음에 하기</button> 
                </div>
            </div>
      </div>
    )
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
            modalOpen && <VerifyModal></VerifyModal>
        }
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
