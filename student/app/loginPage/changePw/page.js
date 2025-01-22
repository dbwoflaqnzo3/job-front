'use client'

<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from '../changePw/page.module.css'

export default function ChangePw({}){

    const router = useRouter()

    //비밀번호 관리
    const [input, setInput] = useState('')
    const [checkInput, setCheckInput] = useState('')
    const [condition1, setCondition1] = useState(false) // 길이 체크
    const [condition2, setCondition2] = useState(false) // 영어,특수문자,숫자 포함 체크

    const [message, setMessage] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const changeInput = (e) => {

        setInput(e.target.value)

    }
    useEffect(() =>{
        
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).+$/

        if(input.length < 8) {
            setCondition1(false)
        } else{
            setCondition1(true)
        }

        if(!regex.test(input)){
            setCondition2(false)
        } else{
            setCondition2(true)
        }
        
    }, [input])
    

    const handleSubmit = async (e) =>{

        e.preventDefault()

        if(input === ''){
            setMessage('비밀번호를 입력해 주세요')
        } else if(checkInput === ''){
            setMessage('비밀번호를 한번 더 입력해 주세요.')
        } else if(checkInput !== input){
            setMessage('비밀번호가 일치하지 않습니다. 다시 작성해 주세요.')
        }

        try {

            const studentId = localStorage.getItem('id')

            const response = await fetch('http://localhost:8080/student/verifyUpdateStudent', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: studentId,
                    password: input
                  })
            })

            if(!response.ok){
                const result = await response.json()
                console.log(result.message, 'message')
                throw new Error('요청을 보내는 데 문제가 있습니다.')
            }
            
            if(response.status === 400 || response.status === 404 ){
                setMessage('비밀번호 변경에 문제가 생겼습니다. 지속적으로 발생할 경우 xxx-xxxx로 문의 바랍니다.')
                return;
            }

            const result = await response.json()
            console.log(result)

        
            console.log(result)
            setModalOpen(true)

        } catch(error){
            console.log(error)
        }
=======
export default function ChangePw(){
=======
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from '../changePw/page.module.css'
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)

export default function ChangePw({}){

<<<<<<< HEAD
>>>>>>> 3fe6d00 (feat[#26] : forget pw 이메일 전송, 인증 모달 구현 (timer 제외))
=======
    const router = useRouter()

    //비밀번호 관리
    const [input, setInput] = useState('')
    const [checkInput, setCheckInput] = useState('')
    const [condition1, setCondition1] = useState(false) // 길이 체크
    const [condition2, setCondition2] = useState(false) // 영어,특수문자,숫자 포함 체크

    const [message, setMessage] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const changeInput = (e) => {

        setInput(e.target.value)

    }
    useEffect(() =>{
        
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).+$/

        if(input.length < 8) {
            setCondition1(false)
        } else{
            setCondition1(true)
        }

        if(!regex.test(input)){
            setCondition2(false)
        } else{
            setCondition2(true)
        }
        
    }, [input])
    

    const handleSubmit = async (e) =>{

        e.preventDefault()

        if(input === ''){
            setMessage('비밀번호를 입력해 주세요')
        } else if(checkInput === ''){
            setMessage('비밀번호를 한번 더 입력해 주세요.')
        } else if(checkInput !== input){
            setMessage('비밀번호가 일치하지 않습니다. 다시 작성해 주세요.')
        }

        try {

            const studentId = localStorage.getItem('id')

            const response = await fetch('http://localhost:8080/student/verifyUpdateStudent', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: studentId,
                    password: input
                  })
            })

            if(!response.ok){
                const result = await response.json()
                console.log(result.message, 'message')
                throw new Error('요청을 보내는 데 문제가 있습니다.')
            }
            
            if(response.status === 400 || response.status === 404 ){
                setMessage('비밀번호 변경에 문제가 생겼습니다. 지속적으로 발생할 경우 xxx-xxxx로 문의 바랍니다.')
                return;
            }

            const result = await response.json()
            console.log(result)

        
            console.log(result)
            setModalOpen(true)

        } catch(error){
            console.log(error)
        }
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)
    }

    return (
        <div>
            <h4>비밀번호 변경하기</h4>
            <form onSubmit={handleSubmit}>
                <p>새 비밀번호를 작성해주세요</p>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)
                <input type="password" value={input} onChange={changeInput} placeholder="비밀번호/password"></input> 
                <ul>
                    {
                        condition1 ? <div></div> : <li style={{color: 'blue'}}>비밀번호는 최소 8자리 이상이어야 합니다.</li>
                    }
                    {
                        condition2 ? <div></div> : <li style={{color: 'blue'}}>영문/특수문자/숫자가 포함되어야 합니다.</li>
                    }
                </ul>
<<<<<<< HEAD
                <p>한번 더 작성해주세요</p>
                <input type="password" value={checkInput} onChange={(e)=>setCheckInput(e.target.value)} placeholder="비밀번호/password"></input>
                {
                    message && <p>{message}</p>
                }

                <button type="submit">변경하기</button>
                {
                    modalOpen && 

                    <div className={styles.modalOverlay}> 
                        <div className={styles.modalContainer}>
                            <h2 className={styles.modalTitle} >비밀번호가 변경되었습니다.</h2>
                            <button className={styles.buttonCancel} onClick={() => router.push('../loginPage')}>로그인 페이지로 돌아가기</button>
                        </div>
                        
                    </div>
                }
=======
                <input type="password" placeholder="비밀번호/password"></input> 

=======
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)
                <p>한번 더 작성해주세요</p>
                <input type="password" value={checkInput} onChange={(e)=>setCheckInput(e.target.value)} placeholder="비밀번호/password"></input>
                {
                    message && <p>{message}</p>
                }

                <button type="submit">변경하기</button>
<<<<<<< HEAD
>>>>>>> 3fe6d00 (feat[#26] : forget pw 이메일 전송, 인증 모달 구현 (timer 제외))
=======
                {
                    modalOpen && 

                    <div className={styles.modalOverlay}> 
                        <div className={styles.modalContainer}>
                            <h2 className={styles.modalTitle} >비밀번호가 변경되었습니다.</h2>
                            <button className={styles.buttonCancel} onClick={() => router.push('../loginPage')}>로그인 페이지로 돌아가기</button>
                        </div>
                        
                    </div>
                }
>>>>>>> c349648 (feat [#26] : 이메일 인증 및 비밀번호 변경 페이지 기능 구현)
            </form>
        </div>     
    )
}