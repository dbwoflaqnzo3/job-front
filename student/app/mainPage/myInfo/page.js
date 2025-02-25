'use client'

import { useState, useEffect, useMemo, useRef } from 'react';
import { readStudentInfo } from '@/app/utils/studentInfoUtil';
import { PageLayout } from '@/app/page';
import styles from './page.module.css';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

export default function userPageController() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 저장
    const [userInfo, setUserInfo] = useState({}) // 유저 정보를 저장하는 object 상태
    const [initDone, setInitDone] = useState(false)
    let updateDone = useRef(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultUserInfo = await readStudentInfo()

                setUserInfo(resultUserInfo)

                setInitDone(true)
                // console.log(typeof(resultUserInfo), "-----")
            } catch (err) {
                setErrorMessage(err.message); // 오류 발생 시 상태에 오류 메시지 저장
                console.log("학생 데이터 fetch 에러 :", { err })
            }
        };

        fetchData();

    }, []);

    useEffect(() => {
        if (initDone) {
            // 기존 userInfo에서 원하는 값들만 가공하여 updateBody에 담습니다.
            let updateBody = {
                birthDate: userInfo.birthDate.slice(0, 10),
                phoneNumber: userInfo.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
                parentNumbers: userInfo.parentNumbers.map(number =>
                    number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
                ),
                email: userInfo.email,
                userId: userInfo.userId
            };

            if (userInfo.sex == "Male") {
                console.log("!!@!")
                updateBody.sex = "남"
            } else if (userInfo.sex == "Female") {
                updateBody.sex = "여"
            }


            // updateBody를 기존 상태와 병합하여 업데이트합니다.
            setUserInfo(prevUserInfo => ({
                ...prevUserInfo,
                ...updateBody
            }));

            updateDone.current = true
            setInitDone(false)
        }
    }, [initDone]);

    const handlePage1 = () => {
        router.push('myInfo/changePhone');
    };
    const handlePage2 = () => {
        router.push('myInfo/changeMail');
    };
    const handlePage3 = () => {
        router.push('myInfo/changePassword');
    };

    return (
        <PageLayout>
            {userInfo ? (
                <div className={styles.Container}>
                    <h1 className={styles.instruction}>내 정보</h1>
                    <div className={styles.buttonContainer}>
                        <div className={styles.hidden}>
                            <InfoCard instruction="안보이게 변경하기" icon="아이콘" />
                        </div>
                        <InfoCard instruction="연락처 변경하기" icon="phone" click={() => handlePage1()} />
                        <InfoCard instruction="이메일 변경하기" icon="mail" click={() => handlePage2()} />
                        <InfoCard instruction="비밀번호 변경하기" icon="lock" click={() => handlePage3()} />
                    </div>
                    <div className={styles.infoTableContainer}>
                        {/* {console.log(userInfo)} */}

                        <UserInfoList1 userInfo={userInfo} />

                        <UserInfoList2 userInfo={updateDone && userInfo} />

                    </div>
                </div>
            ) : (
                <div> Loading... </div>
            )}
        </PageLayout>
    )
}

function InfoCard({ instruction, icon, click }) {
    const getIconComponent = (icon) => {
        if (!icon) return null;
        return dynamic(() => import(`@/public/assets/images/icons/${icon}.svg`).catch(() => ({ default: () => null })));
    };

    const IconComponent = useMemo(() => (icon ? getIconComponent(icon) : null), [icon]);

    return (
        <div className={styles.infoCardContainer} onClick={click}>
            <div className={styles.infoCardInfo}>
                {instruction.split(" ").map((word, index) => (
                    <span key={index}>
                        {word}
                        <br />
                    </span>
                ))}
            </div>
            <div className={styles.infoCardIcon}>
                <IconComponent />
            </div>
        </div>
    )
}

function UserInfoList1({ userInfo }) {
    if (!userInfo) {
        return <div>로딩중...</div>;
    }

    return (
        <div className={styles.userInfoListContainer}>
            {
                userInfo ?
                    <div>
                        <div className={styles.row}>
                            <div>이름</div>
                            <div>{userInfo.name}</div>
                        </div>
                        <div className={styles.row}>
                            <div>회원상태</div>
                            <div>{userInfo.status}</div>
                        </div>
                        <div className={styles.row}>
                            <div>학년</div>
                            <div>{userInfo.grade}</div>
                        </div>
                        <div className={styles.row}>
                            <div>레벨</div>
                            <div>{userInfo.level}</div>
                        </div>
                        <div className={styles.row}>
                            <div>학원 이름</div>
                            <div>JOB 영어학원</div>
                        </div>
                        <div className={styles.rowLast}>
                            <div>담당 선생님</div>
                            <div>{userInfo?.teacherId?.name || '정보 없음'}</div>
                        </div>
                    </div>
                    :
                    <div>
                        Loading...
                    </div>
            }
        </div>
    )
}

function UserInfoList2({ userInfo }) {
    if (!userInfo) {
        return <div>로딩중...</div>;
    }

    return (
        <div className={styles.userInfoListContainer}>
            {
                userInfo ?
                    <div>
                        <div className={styles.row}>
                            <div>성별</div>
                            <div>{userInfo.sex}</div>
                        </div>
                        <div className={styles.row}>
                            <div>생년월일</div>
                            <div>{userInfo.birthDate}</div>
                        </div>
                        <div className={styles.row}>
                            <div>연락처</div>
                            <div>{userInfo.phoneNumber}</div>
                        </div>
                        <div className={styles.row}>
                            <div>보호자 연락처</div>
                            <div>{userInfo.parentNumbers}</div>
                        </div>
                        <div className={styles.row}>
                            <div>이메일</div>
                            <div>{userInfo.email}</div>
                        </div>
                        <div className={styles.rowLast}>
                            <div>아이디</div>
                            <div>{userInfo.userId}</div>
                        </div>
                    </div>

                    :
                    <div>
                        Loading...
                    </div>

            }

        </div>

    )
}