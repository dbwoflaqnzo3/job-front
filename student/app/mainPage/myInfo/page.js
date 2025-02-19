'use client'

import { useState, useEffect, useMemo } from 'react';
import { readStudentInfo } from '@/app/utils/studentInfoUtil';
import { PageLayout } from '@/app/page';
import { Row, Column } from "@/app/widgets/structure/Grid";
import styles from './page.module.css';
import dynamic from "next/dynamic";
import Image from "next/image";

export default function userPageController() {

    const [errorMessage, setErrorMessage] = useState("");
    const [userInfo, setUserInfo] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultUserInfo = await readStudentInfo()

                setUserInfo(resultUserInfo)

                // console.log(typeof(resultUserInfo), "-----")
                // console.log(userInfo)
            } catch (err) {
                setErrorMessage(err.message); // 오류 발생 시 상태에 오류 메시지 저장
                console.log("학생 데이터 fetch 에러 :", { err })
            }
        };

        fetchData();

    }, []);

    return (
        <PageLayout>
            <div className={styles.Container}>
                <h1 className={styles.instruction}>내 정보</h1>
                <div className={styles.buttonContainer}>
                    <div className={styles.hidden}>
                        <InfoCard instruction="안보이게 변경하기" icon="아이콘" />
                    </div>
                    <InfoCard instruction="연락처 변경하기" icon="phone" />
                    <InfoCard instruction="이메일 변경하기" icon="mail" />
                    <InfoCard instruction="비밀번호 변경하기" icon="lock" />
                </div>
                <div className={styles.infoTableContainer}>
                    {/* {console.log(userInfo)} */}

                    <UserInfoList1 userInfo={userInfo} />

                    <UserInfoList2 userInfo={userInfo} />

                </div>
            </div>
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
        <div className={styles.infoCardContainer} onclick={click}>
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

function UserInfoList1(userInfo) {
    const info = userInfo.userInfo
    const [infoList, setInfoList] = useState([])

    useEffect(() => {
        if (userInfo) {
            setInfoList([userInfo.userInfo.name, userInfo.userInfo.status, userInfo.userInfo.level, userInfo.userInfo.grade, userInfo.userInfo.level, userInfo.userInfo.grade])
        }
    }, [userInfo])

    console.log(infoList)

    return (
        <div className={styles.userInfoListContainer}>
            <div className={styles.row}>
                <div>이름</div>
                <div>{info.name}</div>
            </div>
            <div className={styles.row}>
                <div>회원상태</div>
                <div>{info.status}</div>
            </div>
            <div className={styles.row}>
                <div>부서</div>
                <div>{info.level}</div>
            </div>
            <div className={styles.row}>
                <div>학년</div>
                <div>{info.grade}</div>
            </div>
            <div className={styles.row}>
                <div>레벨</div>
                <div>{info.level}</div>
            </div>
            <div className={styles.rowLast}>
                <div>학원반</div>
                <div>{info.userId}</div>
            </div>
        </div>
    )
}

function UserInfoList2(userInfo) {
    const info = userInfo.userInfo

    return (
        <div className={styles.userInfoListContainer}>
            <div className={styles.row}>
                <div>성별</div>
                <div>{info.sex}</div>
            </div>
            <div className={styles.row}>
                <div>생년월일</div>
                <div>{info.birthDate}</div>
            </div>
            <div className={styles.row}>
                <div>연락처</div>
                <div>{info.phoneNumber}</div>
            </div>
            <div className={styles.row}>
                <div>보호자 연락처</div>
                <div>{info.parentNumbers}</div>
            </div>
            <div className={styles.row}>
                <div>이메일</div>
                <div>{info.email}</div>
            </div>
            <div className={styles.rowLast}>
                <div>아이디</div>
                <div>{info.userId}</div>
            </div>
        </div>
    )
}