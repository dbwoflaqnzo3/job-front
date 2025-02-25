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

export default function ForgetPw() {
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

    useEffect(() => {
        const valid = emailPrefix !== "" && emailPostFix !== "";
        setIsValid(valid);
    }, [emailPrefix, emailPostFix]);

    // 1. 이메일 인증번호 전송
    const sendVerifyMail = async () => {
        const email = `${emailPrefix}@${emailPostFix}`;
        setUserMail(email);
        console.log(emailPostFix) // 직접 입력시 enter 후 실행 -> object{label, value} || enter 안 누르고 실행 -> 값이 안 읽힘
        console.log(email, "__________")

        if (emailPostFix !== '') {
            try {
                const result = await sendVerifyCode(email);
                if (result.status == 200) {
                    console.log('메일 인증 보내기 성공');
                    setVerificationId(result.json.result)
                    setModalOpen(true);
                } if (result.status == 203) {
                    console.log(result.json.resExpireDate)
                    setVerificationId(result.json.result)
                    setModalOpen(true);
                } else {
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
            {
                modalOpen && <EmailModal
                    verifyId={verificationId}
                    setIsVerified={setIsVerified}
                    setModalOpen={setModalOpen}
                />
            }
            {!isVerified ? (
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






function EmailModal({ verifyId, setIsVerified, setModalOpen }) {
    const [verifyCode, setVerifyCode] = useState('');
    const [error, setError] = useState('');

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

    //인증 timer
    const [timeLeft, setTimeLeft] = useState(180); // timer 남은 시간 (초 단위)

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    // 타이머 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer1}>
                <Column gap={84}>
                    <div className={styles.modalInstruction}>
                        <p className={`${styles["titleText"]} ko-sb-30`}>작성하신 이메일로 인증번호가 발송되었어요</p>
                    </div>
                    <Column gap={80}>
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
                                <p>{formatTime(timeLeft)}</p>
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
            </div>
        </div>
    )
}