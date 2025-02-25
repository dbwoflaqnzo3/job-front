'use client'

import { useState, useEffect } from 'react';
import SizedBox from "@/app/widgets/structure/SizedBox";
import { checkStudentPhone, changePhoneNumber } from '@/app/utils/checkDuplicatedPhoneUtil';
import { Validator, ValidatorType } from "@/app/utils/validator";
import { PageLayout } from '@/app/page';
import { useRouter } from 'next/navigation';
import { Button3 } from "@/app/components/ui/buttons/Regular";
import TextField from "@/app/components/ui/TextField";
import styles from "./page.module.css";

export default function changePhone() {
    const router = useRouter();
    const [check, setCheck] = useState(false); // 사용자가 연락처 입력 안 하면 변경 페이지로 못 가게 막는 상태
    const [checkPhone, setCheckPhone] = useState(null);
    const [inputPhone, setInputPhone] = useState('');
    const [inputPhone2, setInputPhone2] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const regex = /^010\d{8}$/;
        setCheck(regex.test(inputPhone));
    }, [inputPhone]);


    const checkDuplicate = async (number) => {
        try {
            const resultDuplicate = await checkStudentPhone(number)
            if (resultDuplicate === true) {
                setCheckPhone(true)
                console.log("FAILED")
            } else {
                setCheckPhone(false)
                console.log("PASSED")
            }
        } catch (err) {
            setError(err.message); // 오류 발생 시 상태에 오류 메시지 저장
            console.log("학생 연락처 fetch 에러 :", { err })
        }
    }

    const changePhone = async () => {
        if (inputPhone === inputPhone2) {
            try {
                const result = await changePhoneNumber(inputPhone2);
                if (result == 200) {
                    console.log('연락처 변경 성공')
                    router.push('/mainPage/myInfo');
                } else {
                    setError("연락처 입력 에러.");
                }
            } catch (err) {
                setError(err.message);
                console.error("연락처 변경 에러:", err);
            }
        }
    }

    return (
        <PageLayout hide={true}>
            {(checkPhone === null || checkPhone === true) ? (
                <div className={styles.container}>
                    <h4 className={styles.title}>연락처 변경하기</h4>
                    <p className={styles.instruction}>변경할 연락처를 입력해주세요</p>
                    <TextField
                        type="text"
                        placeholder="‘-’ 없이 숫자만 입력해주세요"
                        value={inputPhone}
                        onChange={setInputPhone}
                        error={error}
                        stretch
                        showMismatchOnly={true}
                        validators={[
                            new Validator("010\\d{8}", "전화번호를 정확히 입력해주세요")
                            // new Validator(check, "전화번호를 정확히 입력해주세요")
                        ]}
                    />
                    {!checkPhone && <SizedBox height={4} />}
                    {checkPhone && <SizedBox height={10}><p className={`ko-md-13 ${styles["error"]}`}>이미 등록된 전화번호 입니다.</p></SizedBox>}
                    <div className={styles.space} />
                    <Button3 text="중복 조회" disabled={!check} onClick={() => { checkDuplicate(inputPhone) }} stretch />
                </div>
            ) : (
                <div className={styles.container}>
                    <h4 className={styles.title}>연락처 변경하기</h4>
                    <p className={styles.instruction}>변경할 연락처를 한번 더 입력해주세요</p>
                    <TextField
                        type="text"
                        placeholder="‘-’ 없이 숫자만 입력해주세요"
                        value={inputPhone2}
                        onChange={setInputPhone2}
                        error={error}
                        stretch
                    />
                    <SizedBox height={4} />
                    {inputPhone != inputPhone2 && <SizedBox height={10}><p className={`ko-md-13 ${styles["error"]}`}>이전에 입력한 전화번호와 일치하지 않습니다.</p></SizedBox>}
                    <div className={styles.space} />
                    <Button3 text="확인하기" disabled={inputPhone != inputPhone2} onClick={changePhone} stretch />
                </div>
            )}
        </PageLayout>
    )
}