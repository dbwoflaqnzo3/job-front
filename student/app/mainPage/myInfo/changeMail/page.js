'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from '@/app/page';
import { Button3, Button4 } from "@/app/components/ui/buttons/Regular";
import { EmailDropdownButton1 } from "@/app/components/ui/buttons/Dropdown";
import { Column, Row } from "@/app/widgets/structure/Grid";
import { updateEmail, sendVerifyCode, verifyMail } from "@/app/utils/changeMailUtil";
import { RowFlex } from "@/app/widgets/structure/Flex";
import SizedBox from "@/app/widgets/structure/SizedBox";
import TextField from "@/app/components/ui/TextField";
import Card from "@/app/components/ui/Card";
import styles from './page.module.css'
import Image from 'next/image'

export default function ChangeMail() {
    const router = useRouter()

    const [isVerified, setIsVerified] = useState(false); // 메일 인증 확인 상태
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false); // 인증 확인 모달

    const [emailPrefix, setEmailPrefix] = useState("");
    const [emailPostFix, setEmailPostfix] = useState("");
    const [userMail, setUserMail] = useState('');
    const [userMail2, setUserMail2] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [isValid, setIsValid] = useState(false);

    //인증 timer
    const [expireDate, setExpireDate] = useState(null) // 유효 시간

    useEffect(() => {
        const valid = emailPrefix !== "" && emailPostFix !== "";
        setIsValid(valid);
    }, [emailPrefix, emailPostFix]);

    // 1. 이메일 인증번호 전송
    const sendVerifyMail = async () => {
        const email = `${emailPrefix}@${emailPostFix}`;
        setUserMail(email);

        if (emailPostFix !== '') {
            setModalOpen(true);
            try {
                const result = await sendVerifyCode(email);
                if (result.status == 200) { // 인증 코드 전송 성공
                    console.log('메일 인증 보내기 성공');
                    console.log(result.json.resExpireDate);
                    setVerificationId(result.json.result)
                    const expireTime = new Date(result.json.resExpireDate) // 만료 시간 설정 
                    setExpireDate(expireTime)
                } else if (result.status == 203) { // 이미 인증 코드 보내고 진행중
                    console.log(result.json.resExpireDate)
                    setVerificationId(result.json.result)
                    const expireTime = new Date(result.json.resExpireDate) // 만료 시간 설정 
                    setExpireDate(expireTime)
                } else if (result.status == 204) { // 이미 다른 이메일로 인증 진행중
                    console.log(result.json.resExpireDate)
                    setVerificationId(result.json.result)
                    const expireTime = new Date(result.json.resExpireDate) // 만료 시간 설정 
                    setExpireDate(expireTime)
                } else { // 이메일이 없거나 기타 에러
                    setError("메일 인증 전송 에러.");
                }
            } catch (err) {
                console.log("HERE!!!!")
                setError(err.message);
                console.error("메일 인증 전송 에러: ", err);
            }
        }
    }

    // 3. 이메일 변경
    const changeMail = async () => {
        if (userMail === userMail2) {
            try {
                const result = await updateEmail(userMail2);
                if (result == 200) {
                    console.log('이메일 변경 성공')
                    router.push('/mainPage/myInfo');
                } else {
                    setError("이메일 변경 에러.");
                }
            } catch (err) {
                setError(err.message);
                console.error("이메일 변경 에러:", err);
            }
        }
    }

    return (
        <PageLayout hide={true}>
            <AlreadySentModal />
            {
                modalOpen && <VerifyModal
                    verifyId={verificationId}
                    setIsVerified={setIsVerified}
                    setModalOpen={setModalOpen}
                    endDate={expireDate}
                    reSend={sendVerifyMail}
                />
            }
            {!isVerified ?
                (
                    <Column>
                        <SizedBox height={178} />
                        <Column justifyContent="space-between" alignItems="center">
                            <Card width={575} padding={32} justifyItems="center">
                                <Column gap={36} alignItems="flex-start">
                                    <h4 className="ko-md-17">변경할 이메일을 입력해주세요</h4>
                                    <RowFlex ratios={[280, 15, 200]}>
                                        <TextField
                                            placeholder="example"
                                            onChange={setEmailPrefix}
                                            stretch
                                        />
                                        @
                                        <EmailDropdownButton1
                                            onSelect={setEmailPostfix}
                                            stretch
                                        />
                                    </RowFlex>
                                </Column>
                            </Card>
                            <Button3 text="인증하기" onClick={sendVerifyMail} disabled={!isValid} stretch />
                        </Column>
                    </Column>
                ) : (
                    <div>
                        <Column>
                            <SizedBox height={178} />
                            <Column justifyContent="space-between" alignItems="center">
                                <Card width={575} padding={32} justifyItems="center">
                                    <Column gap={36} alignItems="flex-start">
                                        <h4 className="ko-md-17">변경할 이메일을 한번 더 입력하세요.</h4>
                                        <TextField
                                            placeholder="example@example.com"
                                            onChange={setUserMail2}
                                            stretch
                                        />
                                    </Column>
                                </Card>
                                <Button3 text="저장하기" onClick={changeMail} disabled={userMail !== userMail2} stretch />
                            </Column>
                        </Column>
                    </div>
                )
            }
        </PageLayout>
    )
}



function VerifyModal({ verifyId, setIsVerified, setModalOpen, endDate, reSend }) {
    const [verifyCode, setVerifyCode] = useState('');
    const [error, setError] = useState('');

    // Timer
    const [timeLeft, setTimeLeft] = useState(0); // timer 남은 시간 (초 단위)
    const [isExpiredTime, setIsExpiredTime] = useState(false) // 인증 코드 유효시간 확인 상태
    const [expireDate, setExpireDate] = useState(null)
    const now = new Date(Date.now())

    // 2. 이메일 인증 확인
    const checkMail = async (id, code) => {
        try {
            const result = await verifyMail(id, code);
            if (result === 2) {
                setError("만료된 요청입니다. 요청을 재전송해주세요.");
            } else if (result === 0) {
                setError("잘못된 인증번호입니다.");
                console.log("잘못된 인증번호입니다.")
            } else if (result === 1) {
                setIsVerified(true);
                setModalOpen(false);
            }
        } catch (err) {
            setError(err.message);
            console.error("메일 인증 에러: ", err);
        }
    }

    // 타이머 초기 시간 설정
    useEffect(() => {
        if (verifyId && endDate) {
            setExpireDate(endDate);
            const now = new Date();
            setTimeLeft(Math.floor((endDate - now) / 1000));
        }
    }, [verifyId, endDate])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    // 타이머 업데이트: verifyId와 expireDate가 존재할 때만 타이머 작동
    useEffect(() => {
        if (verifyId && expireDate && timeLeft > 0) {
            const interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((expireDate - now) / 1000);
                if (diff <= 0) {
                    clearInterval(interval);
                    setIsExpiredTime(true);
                    setTimeLeft(0);
                } else {
                    setTimeLeft(diff);
                }
            }, 1000); // 1초마다 업데이트

            return () => clearInterval(interval);
        }
    }, [verifyId, expireDate, timeLeft]);
    
    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer1}>
                {!verifyId ? (
                    <p>loading...</p>
                ) : (
                    <Column gap={84}>
                        <div className={styles.modalInstruction}>
                            <p className={`${styles["titleText"]} ko-sb-30`}>작성하신 이메일로 인증번호가 발송되었어요</p>
                        </div>
                        <Column gap={80}>

                            {/* 중간 컨텐츠 */}
                            <div className={styles.modalTextAndTimer}>
                                <Row gap="1.5rem">
                                    <TextField
                                        type="text"
                                        placeholder="인증번호를 입력하세요"
                                        value={verifyCode}
                                        onChange={setVerifyCode}
                                        error={'error'}
                                        width={360}
                                    />
                                    {isExpiredTime ? (
                                        <Button4 text="다음에하기" width={35} onClick={reSend} />
                                    ) : (
                                        <p>{formatTime(timeLeft)}</p>
                                    )}
                                </Row>
                            </div>


                            <div className={styles.modalButtonContainer}>
                                <Column gap={16}>
                                    <Button3 text="인증하기" disabled={verifyCode == ''} width={452} onClick={() => { checkMail(verifyId, verifyCode) }} />
                                    <Button4 text="다음에하기" width={452} onClick={closeModal} />
                                </Column>
                            </div>
                        </Column>
                    </Column>
                )}
            </div>
        </div>
    )
}

// 로딩중 모달
function LoadingModal({ setModalOpen }) {

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer1}>
                <Column gap={15}>
                    <div className={styles.modalInstruction}>
                        <p className={`${styles["titleText"]} ko-sb-30`}>로딩 중...</p>
                    </div>
                    <Column gap={58} alignItems="center">
                        <Image
                            src="/assets/images/loading.svg"
                            width={260}
                            height={260}
                            alt="Picture of the author"
                        />
                        <Button3 text="다음에하기" width={452} onClick={closeModal} />
                    </Column>
                </Column>
            </div>
        </div>
    )
}

// 다른 이메일로 인증 진행중 모달
function AlreadySentModal({ setModalOpen }) {

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer1}>
                <Image
                    src="/assets/images/nope.svg"
                    width={260}
                    height={260}
                    alt="Picture of the author"
                    className={styles.imagePlacement}
                />
                <Column gap={288}>
                    <div className={styles.modalInstruction}>
                        <p className={`${styles["titleText"]} ko-sb-30`}>다른 이메일로 인증이 진행 중이에요</p>
                    </div>
                    <Column gap={0} alignItems="center">
                        <Button3 text="다음에하기" width={452} onClick={closeModal} />
                    </Column>
                </Column>
            </div>
        </div>
    )
}