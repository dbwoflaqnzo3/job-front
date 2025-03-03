'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from '@/app/page';
import { Button1, Button2, Button3, Button4 } from "@/app/components/ui/buttons/Regular";
import { EmailDropdownButton1 } from "@/app/components/ui/buttons/Dropdown";
import { Column, Row } from "@/app/widgets/structure/Grid";
import { updateEmail, sendVerifyCode, verifyMail } from "@/app/utils/changeMailUtil";
import { RowFlex } from "@/app/widgets/structure/Flex";
import SizedBox from "@/app/widgets/structure/SizedBox";
import TextField from "@/app/components/ui/TextField";
import Card from "@/app/components/ui/Card";
import styles from './page.module.css'
import DynamicIcon from "@/app/components/ui/image/DynamicIcon";
import { Popup, PopupButtons, PopupContent } from "@/app/components/ui/popup/Popup";

export default function ChangeMail() {
    const router = useRouter()

    const [isVerified, setIsVerified] = useState(false); // 메일 인증 완료 상태
    const [error, setError] = useState('');
    // modalType 상태 : "", "loading", "verify", "used", "timeup", "clear", "error"
    const [modalType, setModalType] = useState("");

    const [emailPrefix1, setEmailPrefix1] = useState("");
    const [emailPostFix1, setEmailPostFix1] = useState("");
    const [userMail, setUserMail] = useState('');
    const [userMail2, setUserMail2] = useState('');

    const [verificationId, setVerificationId] = useState(null);
    const [isValid, setIsValid] = useState(false);

    // 인증 만료 시간
    const [expireDate, setExpireDate] = useState(null)

    useEffect(() => {
        const valid = emailPrefix1 !== "" && emailPostFix1 !== "";
        setIsValid(valid);
    }, [emailPrefix1, emailPostFix1]);

    // 1. 이메일 인증번호 전송 (모달 흐름: 로딩 → (이메일 중복이면 ModalUsed / 아니면 VerifyModal))
    const sendVerifyMail = async () => {
        const email = `${emailPrefix1}@${emailPostFix1}`;
        setUserMail(email);

        if (emailPostFix1 !== '') {
            // 로딩 모달 띄움
            setModalType("loading");
            try {
                const result = await sendVerifyCode(email);
                if (result.status === 200 || result.status === 203 || result.status === 204) {
                    console.log('메일 인증 보내기 성공');
                    console.log(result.json.resExpireDate);
                    setVerificationId(result.json.result);
                    const expireTime = new Date(result.json.resExpireDate);
                    setExpireDate(expireTime);
                    // 인증 모달로 전환
                    setModalType("verify");
                } else {
                    setError("메일 인증 전송 에러.");
                    setModalType("error");
                }
            } catch (err) {
                console.error("메일 인증 전송 에러: ", err);
                // 에러 메시지에서 '다른 학생이 사용중인 이메일' 문구가 포함되어 있으면 ModalUsed로 전환
                if (err.message && err.message.includes("다른 학생이 사용중인 이메일")) {
                    setModalType("used");
                } else {
                    setError(err.message || "메일 인증 전송 에러.");
                    setModalType("error");
                }
            }
        }
    }

    // 3. 이메일 변경 (인증코드가 맞을 경우)
    const changeMail = async () => {
        const email = `${emailPrefix1}@${emailPostFix1}`;
        try {
            const result = await updateEmail(email);
            if (result === 200) {
                console.log('이메일 변경 성공');
            } else {
                setError("이메일 변경 에러.");
                setModalType("error");
            }
        } catch (err) {
            console.error("이메일 변경 에러:", err);
            setError(err.message);
            setModalType("error");
        }
    }

    function toMyInfo() {
        router.push('/mainPage/myInfo')
    }

    return (
        <PageLayout hide={true}>
            <button className={styles.backButton} onClick={toMyInfo}><DynamicIcon icon={"arrowLeft"} size={38} /></button>
            {/* 모달 종류에 따라 조건부 렌더링 */}
            {modalType === "loading" && <ModalLoading setModalType={setModalType} />}
            {modalType === "verify" &&
                <VerifyModal
                    verifyId={verificationId}
                    setIsVerified={setIsVerified}
                    setModalType={setModalType}
                    endDate={expireDate}
                    onVerified={changeMail} // 인증 성공 시 이메일 변경 함수 호출
                />
            }
            {modalType === "used" && <ModalUsed setModalType={setModalType} />}
            {modalType === "timeup" && <ModalTimeUp setModalType={setModalType} reSend={sendVerifyMail} />}
            {modalType === "clear" && <ModalClear setModalType={setModalType} />}
            {modalType === "error" && <ModalError setModalType={setModalType} />}
            {modalType === "wrong" && <ModalWrong setModalType={setModalType} />}

            {/* 메인 화면 : 아직 인증 완료되지 않은 경우 */}
            {!isVerified && modalType === "" && (
                <Column alignItems="center">
                    <h1>이메일 변경하기</h1>
                    <SizedBox height={178} />
                    <Column justifyContent="space-between" alignItems="center">
                        <Card width={575} padding={32} justifyItems="center" transparent="true">
                            <Column gap={8} alignItems="flex-start">
                                <h4 className="ko-md-17">변경할 이메일을 입력해주세요</h4>
                                <RowFlex ratios={[280, 15, 200]}>
                                    <TextField
                                        placeholder="example"
                                        onChange={setEmailPrefix1}
                                        stretch
                                    />
                                    @
                                    <EmailDropdownButton1
                                        onSelect={setEmailPostFix1}
                                        stretch
                                    />
                                </RowFlex>
                            </Column>
                        </Card>
                        <Button3 text="인증하기" onClick={sendVerifyMail} width={400} disabled={!isValid} />
                    </Column>
                </Column>
            )}
        </PageLayout>
    )
}

// 인증 모달: 타이머 동작, 인증코드 입력 후 checkMail 실행  
// 인증 모달: 타이머 동작, 인증코드 입력 후 checkMail 실행  
function VerifyModal({ verifyId, setIsVerified, setModalType, endDate, onVerified }) {
    const [verifyCode, setVerifyCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);

    // 타이머 초기화
    useEffect(() => {
        if (verifyId && endDate) {
            const now = new Date();
            setTimeLeft(Math.floor((endDate - now) / 1000));
        }
    }, [verifyId, endDate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    // 타이머 업데이트: 제한시간 만료 시 "timeup" 모달로 전환
    useEffect(() => {
        if (verifyId && endDate && timeLeft > 0) {
            const interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((endDate - now) / 1000);
                if (diff <= 0) {
                    clearInterval(interval);
                    setTimeLeft(0);
                    setModalType("timeup");
                } else {
                    setTimeLeft(diff);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [verifyId, endDate, timeLeft, setModalType]);

    // 인증번호 확인: 결과에 따라
    // 인증 모달 내 인증번호 확인: 결과에 따라 처리
    const checkMail = async (id, code) => {
        try {
            const result = await verifyMail(id, code);
            console.log("Verification result:", result); // 결과 디버깅
            // 느슨한 비교 또는 명시적 파싱을 사용
            if (result == 2) {
                console.error("만료된 요청입니다. 요청을 재전송해주세요.");
                setModalType("timeup");
            } else if (result == 0) {
                // 인증번호가 틀린 경우: ModalWrong 띄움
                setModalType("wrong");
            } else if (result == 1) {
                console.log("인증 성공: onVerified 호출 전", typeof onVerified);
                // 인증번호가 맞으면, 변경 중에는 로딩 모달을 띄우고 changeMail 실행
                setModalType("loading");
                if (typeof onVerified === "function") {
                    await onVerified(); // changeMail 호출
                    setModalType("clear");
                } else {
                    console.error("onVerified가 함수가 아닙니다.");
                    setModalType("error");
                }
            }
        } catch (err) {
            console.error("메일 인증 에러: ", err);
        }
    }

    const closeModal = () => {
        setModalType("");
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer1}>
                {!verifyId ? (
                    <ModalLoading setModalType={setModalType} />
                ) : (
                    <Popup
                        name="p1"
                        theme="primary"
                        title="작성하신 이메일로\n인증번호가 발송되었어요"
                        display={true}
                        onClose={closeModal}
                    >
                        <PopupContent>
                            <Row gap={24}>
                                <TextField
                                    placeholder="인증번호를 입력하세요"
                                    value={verifyCode}
                                    onChange={setVerifyCode}
                                    allowSpace={false}
                                    stretch
                                />
                                <p>{formatTime(timeLeft)}</p>
                            </Row>
                        </PopupContent>
                        <PopupButtons>
                            <Button4
                                text="인증하기"
                                onClick={() => { checkMail(verifyId, verifyCode) }}
                                disabled={false}
                                stretch
                            />
                            <Button4
                                text="다음에 하기"
                                onClick={closeModal}
                                disabled={false}
                                stretch
                            />
                        </PopupButtons>
                    </Popup>
                )}
            </div>
        </div>
    )
}

// 로딩 모달
function ModalLoading({ setModalType }) {
    const closeModal = () => {
        setModalType("");
    }

    return (
        <Popup
            name="p1"
            theme="primary"
            title="로딩 중..."
            image="loading"
            display={true}
            onClose={closeModal}
        >
            <PopupButtons>
                <Button4
                    text="다음에 다시 하기"
                    onClick={closeModal}
                    disabled={false}
                    stretch
                />
            </PopupButtons>
        </Popup>
    )
}

// 이메일 중복 모달
function ModalUsed({ setModalType }) {
    const closeModal = () => {
        setModalType("");
    }

    return (
        <Popup
            name="p1"
            theme="primary"
            title="누군가가 이메일을\n사용중이에요"
            description="다시 시도하시겠어요?"
            image="gonlan"
            display={true}
            onClose={closeModal}
        >
            <PopupButtons>
                <Button4
                    text="다른 이메일로 시도하기"
                    onClick={closeModal}
                    disabled={false}
                    stretch
                />
            </PopupButtons>
        </Popup>
    )
}

// 시간 만료 모달 (인증번호 재전송 기능 포함)
function ModalTimeUp({ setModalType, reSend }) {
    const closeModal = () => {
        setModalType("");
    }

    return (
        <Popup
            name="p1"
            theme="primary"
            title="인증에 실패했어요"
            description="다시 시도하시겠어요?"
            imagePosY={.45}
            image="gonlan"
            display={true}
            onClose={closeModal}
        >
            <PopupButtons>
                <Button1
                    text="인증번호 다시 받기"
                    onClick={reSend}
                    disabled={false}
                    stretch
                />
                <Button4
                    text="다른 이메일로 시도하기"
                    onClick={closeModal}
                    disabled={false}
                    stretch
                />
            </PopupButtons>
        </Popup>
    )
}

// 인증 완료 모달
function ModalClear({ setModalType }) {
    const router = useRouter();

    const closeModal = () => {
        setModalType("");
        router.push('/mainPage/myInfo');
    }

    return (
        <Popup
            name="p1"
            theme="primary"
            title="인증이 완료되었어요"
            image="complete"
            display={true}
            onClose={closeModal}
        >
            <PopupButtons>
                <Button4
                    text="확인"
                    onClick={closeModal}
                    disabled={false}
                    stretch
                />
            </PopupButtons>
        </Popup>
    )
}

// 에러 모달
function ModalError({ setModalType }) {
    const router = useRouter();

    const closeModal = () => {
        setModalType("");
        router.push('/mainPage/myInfo');
    }

    return (
        <Popup
            name="p1"
            theme="primary"
            title="오류가 생겼어요"
            image="nope"
            display={true}
            onClose={closeModal}
        >
            <PopupButtons>
                <Button4
                    text="문의하러 가기"
                    onClick={closeModal}
                    disabled={false}
                    stretch
                />
            </PopupButtons>
        </Popup>
    )
}

// 인증코드 틀림 모달
function ModalWrong({ setModalType }) {
    // 재입력 버튼 클릭 시 VerifyModal로 전환
    const reEnter = () => {
        setModalType("verify");
    }

    return (
        <Popup
            name="p1"
            theme="primary"
            title="인증번호가 틀렸어요"
            image="nope"
            display={true}
            onClose={reEnter}
        >
            <PopupButtons>
                <Button4
                    text="인증번호 재입력"
                    onClick={reEnter}
                    disabled={false}
                    stretch
                />
            </PopupButtons>
        </Popup>
    )
}