"use client"

import styles from './page.module.css';
import { useState, useEffect, useRef } from "react";
import { PageLayout } from '@/app/page';
import { ko } from "date-fns/locale"; // 한국어 로케일 추가
import ArrowIcon from "@/public/assets/images/icons/dropdownArrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button1 } from '@/app/components/ui/buttons/Regular';
import { readPaymentPendingInfo, getUserInfo } from '@/app/utils/paymentUtil';
import Image from 'next/image';
import { Table, TableExpandableBody } from '@/app/components/ui/Table';
import { StudentPaymentModel } from '@/app/models/payments';
import { useRouter } from "next/navigation";



export default function PaymentPendingPage() {

    const [startSelectedDate, setStartSelectedDate] = useState(null);
    const [endSelectedDate, setEndSelectedDate] = useState(null);

    const [isSelected, setIsSelected] = useState(null);
    const [data, setData] = useState(null)
    const [initSettingDone, setInitSettingDone] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pendingData = await readPaymentPendingInfo()

                setData(pendingData)
                console.log(pendingData)
                setInitSettingDone(true)
            } catch (e) {
                console.log(`에러 발생 : ${e}`)
            }
        }

        fetchData()
    }, [])

    return (

        <div className={styles.recordBody}>
            <div className={styles.titleTextContainer}>
                <div className={`${styles["titleText"]} ko-sb-30`}>
                    결제 관리
                </div>
            </div>

            <div className={styles.contentTitleContainer}>
                <div className='ko-sb-20' style={{ color: "var(--Black-800, #4D4D4D)" }}>결제할 내역</div>
                <div style={{ width: "53.25rem" }} />
                <div className='ko-sb-20' style={{ color: "var(--Black-800, #4D4D4D)" }}>결제하기</div>
            </div>

            <div className={styles.recordContentBody}>
                <div className={styles.recordTableContainer}>
                    {
                        initSettingDone ?
                            <PaymentTable data={data} />
                            :
                            <div className={`${styles.loadingBody} ko-sb-20`}>
                                <Image
                                    src="/images/calendarNoLesson.png"
                                    alt="Example Image"
                                    width={260}
                                    height={260}
                                    priority
                                />
                                Loading...
                            </div>
                    }

                </div>
                <PaymentCard data={data} initSettingDone={initSettingDone} />
            </div>
        </div>
    );
}


export function PaymentTable({ data }) {

    const [transedData, setTransedData] = useState([])

    useEffect(() => {
        if (data) {
            const tempData = transformPayments(data)
            setTransedData(tempData)
        }

    }, [data])


    const transformPayments = (data) => {
        return data.map(item => new StudentPaymentModel({
            billingDate: new Date(item.addDate).toISOString().split('T')[0], // 'YYYY-MM-DD' 형식으로 변환
            title: item.name,
            amount: item.price,
            manager: item.teacherId?.name ?? "",
            manageAcademy: "" // 데이터에 없으니 빈 문자열 할당
        }));
    };


    const textStyles2 = ["ko-md-17", "ko-md-17", "ko-md-24"];


    return (
        <Table
            paddingLeft={48}
            paddingRight={48}
            height={"34.5rem"}
            columnRatios={[180, 180, 180]}
        >
            <TableExpandableBody
                textStyles={textStyles2}
            >{transedData}</TableExpandableBody>
        </Table>
    )
}






export function PaymentCard({ data, initSettingDone }) {

    const router = useRouter();
    const [cardData, setCardData] = useState(null);
    const [settingDone, setSettingDone] = useState(false)
    const [nothing, setNothing] = useState(false)

    useEffect(() => {
        if (data && initSettingDone) {
            const today = new Date().toISOString().split('T')[0];
            const tempDate = data.filter(item => new Date(item.dueDate).toISOString().split('T')[0] <= today);

            if (tempDate.length == 0) {
                setNothing(true)
                return
            }

            const result = transformPayments(tempDate)
            console.log(result, "!!!")

            setCardData(result)

            localStorage.setItem('paymentIds', JSON.stringify(result.paymentIds)); // 배열 저장 시 JSON 문자열로 변환
            localStorage.setItem('itemsText', result.itemsText); // 문자열은 그대로 저장 가능
            localStorage.setItem('totalAmount', JSON.stringify(result.totalAmount)); // 문자열은 그대로 저장 가능
            setSettingDone(true)


        }
    }, [data, initSettingDone])


    const handleOnClick = () => {
        router.push("/mainPage/paymentPage/paymentProcessingPage")
    }

    const transformPayments = (originalData) => {
        const items = originalData.map(item => item.name); // 항목 이름
        const amounts = originalData.map(item => item.price); // 금액 배열

        const itemAmountList = items.map((item, index) => ({
            item,
            amount: amounts[index].toLocaleString() // 금액에 쉼표 추가
        }));

        const totalAmount = amounts.reduce((acc, cur) => acc + cur, 0).toLocaleString(); // 총액에 쉼표 추가
        const itemsText = items.join(", "); // 항목을 문자열로 결합

        return {
            items,
            amounts,
            addDate: new Date(originalData[0]?.addDate).toISOString().split('T')[0] || "",
            payDate: originalData[0]?.payDate ? new Date(originalData[0].payDate).toISOString().split('T')[0] : null,
            payMethod: originalData[0]?.paymentInfo?.payMethod ?? "",
            academyName: "반대준뿡빵삥영어",
            teacherName: originalData[0]?.teacherId?.name ?? "",
            paymentIds: originalData.map(item => item._id),
            itemAmountList, // 각 항목 및 금액 표시
            totalAmount, // 총 금액 표시
            itemsText // 항목 문자열
        };
    };

    const containerRef = useRef(null); // 부모 컨테이너 참조
    const firstChildRef = useRef(null); // 첫 번째 자식 요소 참조
    const [childHeight, setChildHeight] = useState(0); // height 상태 관리

    useEffect(() => {
        if (!nothing && settingDone && firstChildRef.current) {
            const { height } = firstChildRef.current.getBoundingClientRect(); // 첫 번째 자식 height 가져오기
            setChildHeight(height); // 상태 업데이트
        }
    }, [nothing, settingDone]);


    return (

        <div className={styles.recordCardContainer} ref={containerRef} style={{ height: childHeight ? `${childHeight}px` : "auto" }}>

            {
                !nothing ?
                    settingDone ?
                        <div ref={firstChildRef}>
                            <div style={{ height: "1.75rem" }} />
                            <div className={styles.recordCardItemContainer}>
                                <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                    결제항목
                                </div>

                                <div className={`${styles["recordCardItemBody"]} ko-md-24`}>
                                    {cardData.itemsText}
                                </div>

                            </div>
                            <div className={styles.recordCardItemContainer}>
                                <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                    결제금액
                                </div>

                                <div className={`${styles["recordCardItemBody"]} ko-md-24`}>
                                    {`${cardData.totalAmount}원`}
                                </div>
                                <div style={{ height: "0.25rem" }} />

                                {cardData.itemAmountList.map(({ item, amount }, index) => (
                                    <div className={`${styles["recordCardItemDetail"]} ko-reg-15`} key={index} >
                                        {item}: {amount}원
                                    </div>
                                ))}

                            </div>
                            <div className={styles.recordCardItemContainer}>
                                <div className={styles.recordCardDateContainer}>
                                    <div className={styles.recordDateItem}>
                                        <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                            결제일자
                                        </div>

                                        <div className={`${styles["recordCardDateItemContent"]} ko-sb-20`}>
                                            {new Date().toISOString().split('T')[0]}
                                        </div>
                                    </div>
                                    <div style={{ width: "6.25rem" }} />
                                </div>

                            </div>

                            <div className={styles.recordCardItemContainerLast}>
                                <div className={styles.recordCardDateContainer}>
                                    <div className={styles.recordDateItem}>
                                        <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                            담당 학원명
                                        </div>

                                        <div className={`${styles["recordCardDateItemContent"]} ko-sb-20`}>
                                            {`${cardData.academyName}`}
                                        </div>
                                    </div>
                                    <div style={{ width: "6.25rem" }} />
                                    <div className={styles.recordDateItem}>
                                        <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                            담당 선생님
                                        </div>

                                        <div className={`${styles["recordCardDateItemContent"]} ko-sb-20`}>
                                            {`${cardData.teacherName}`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button1 text="결제하기" stretch disable={setSettingDone} onClick={handleOnClick} />
                            <div style={{ height: "1.75rem" }} />

                        </div>
                        :
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/lessonDone.png"
                                alt="Example Image"
                                width={250}
                                height={250}
                                priority
                            />
                            <div className={`${styles["imageText"]} ko-sb-18`}>
                                목록을 <span dangerouslySetInnerHTML={{ __html: "클릭해<br />" }} /> 상세 내역을 확인해보세요!
                            </div>
                        </div>
                    :
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/lessonDone.png"
                            alt="Example Image"
                            width={250}
                            height={250}
                            priority
                        />
                        <div className={`${styles["imageText"]} ko-sb-18`}>
                            결제할 항목이 없어요!
                        </div>
                    </div>
            }

        </div>
    )
}

