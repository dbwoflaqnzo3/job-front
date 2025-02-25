"use client"

import styles from './page.module.css';
import { useState, useEffect, useRef } from "react";
import { PageLayout } from '@/app/page';
import { ko } from "date-fns/locale"; // 한국어 로케일 추가
import ArrowIcon from "@/public/assets/images/icons/dropdownArrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button5 } from '@/app/components/ui/buttons/Regular';
import Image from 'next/image';
import { Table, TableBody } from '@/app/components/ui/Table';
import { StudentPaymentRecordModel } from '@/app/models/payments';
import { readPaymentRecordInfo } from '@/app/utils/paymentUtil';

export default function PaymentRecordPage() {

    const [startSelectedDate, setStartSelectedDate] = useState(null);
    const [endSelectedDate, setEndSelectedDate] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [tableData, setTableData] = useState(null)
    const [initSettingDone, setInitSettingDone] = useState(false)

    

    // const data = null;
    useEffect(() => {
            const fetchData = async() => {
                try
                {
                    const data = await readPaymentRecordInfo()

                    const transedData = transferData(data)

                    console.log(transedData,transedData[0].title,"??")

                    setTableData(transedData)

                    setInitSettingDone(true)

                }catch(e){
                    console.log(`에러 발생 : ${e}`)
                }
            }
    
            fetchData()
        },[])

    useEffect(() => {
        if(initSettingDone)
        {
            console.log(tableData)
        }
    }, [initSettingDone])


    const searchData = async() => {
        try
        {
            setInitSettingDone(false)
            setSelectedIndex(-1)
            const data = await readPaymentRecordInfo(startSelectedDate,endSelectedDate)

            const transedData = transferData(data)

            // console.log(transedData,transedData[0].title,"??")

            setTableData(transedData)

            setInitSettingDone(true)

        }catch(e){
            console.log(`에러 발생 : ${e}`)
        }
    }


    const transferData = (data) => {
        return data.flatMap(group => {
            const { payDate, totalAmount, payments } = group;
    
            // amountInfo 생성 (항목별 이름과 금액 매핑)
            const amountInfo = payments.reduce((acc, payment) => {
                acc[payment.name] = payment.price;
                return acc;
            }, {});

            console.log(payments[0],"!!!")
    
            // 공통 정보
            const commonData = {
                payDate: new Date(payDate),
                method: JSON.parse(payments[0]?.paymentInfo?.payDetail || '{}')?.method || "미확인",
                amount: totalAmount,
                billingDate: new Date(payments[0]?.addDate),
                amountInfo,
                manager: data[0]?.teacherName, // 데이터에 없다면 하드코딩 또는 수정 필요
                manageAcademy: "반대준 학원" // 필요 시 동적 할당 가능
            };
    
            // 변환된 데이터 반환
            return [
                new StudentPaymentRecordModel({
                    ...commonData,
                    title: payments.map(payment => payment.name).join(", ") // 항목명 결합
                })
            ];
        });
    };

    return (


        <div className={styles.recordBody}>
            <div className={styles.titleTextContainer}>
                <div className={`${styles["titleText"]} ko-sb-30`}>
                    결제 내역
                </div>
            </div>
            <div className={styles.dateContainer}>
                <div style={{ width: "22rem" }} />
                <DatePickerButton titleText="시작일" selectedDate={startSelectedDate} setSelectedDate={setStartSelectedDate} endDate={endSelectedDate} type={0} />
                <div className={`${styles["dateGapText"]} ko-reg-17`}> ~ </div>
                <DatePickerButton titleText="종료일" selectedDate={endSelectedDate} setSelectedDate={setEndSelectedDate} startDate={startSelectedDate} type={1} />
                <div style={{ width: "1.5rem" }} />
                <Button5 text="찾기" width={"7.87rem"} disabled={!startSelectedDate||!endSelectedDate} onClick={searchData}/>
            </div>
            <div className={styles.recordContentBody}>
                <div className={styles.recordTableContainer}>
                    {
                        tableData?
                            tableData.length !=0?
                            <TableBlock data = {tableData} setSelectedIndex={setSelectedIndex} initSettingDone={initSettingDone}/>
                            :
                            <div className={styles.tableNoneDataBody}>
                                <div className='ko-sb-18' style={{color: "var(--Secondary500, #0084D0)"}}>
                                    결제 내역이 존재하지 않습니다!
                                </div>
                            </div>
                        :
                        <div className={styles.tableLoadingBody}>
                            <div className='ko-sb-18' style={{color: "var(--Secondary500, #0084D0)"}}>
                                    Loading...
                                </div>
                        </div>
                    }
                    
                </div>

                <PaymentCard data={tableData} selectedIndex={selectedIndex} initSettingDone={initSettingDone}/>
            </div>
        </div>
    );
}

export function TableBlock({data, setSelectedIndex, initSettingDone}) {
    const [tableData, setTableData] = useState(null)

    const textStyles2 = ["ko-md-17", "ko-md-17", "ko-md-17", "ko-md-24"];

    return (

        initSettingDone?
        <Table
            paddingLeft={118}
            paddingRight={72}
            // height={300}
            columnRatios={[94, 212, 94, 212]}
        >
            <TableBody
                textStyles={textStyles2}
                onSelect={setSelectedIndex}
            >{data}</TableBody>
        </Table>
        :
        <div>Loading</div>
    )
}



export function DatePickerButton({ titleText, selectedDate, setSelectedDate, startDate, endDate, type }) {
    // const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const calendarRef = useRef(null);

    // 외부 클릭 감지해서 달력 닫기
    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.dateBox} ref={calendarRef}>
            <button className={styles.dateOpenBtn}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={`${styles["dateText"]} ko-sb-15`}>
                    {selectedDate ? selectedDate.toLocaleDateString() : titleText}
                </div>
                <div className={selectedDate == null ? styles.gap : styles.gapSelect}> </div>
                <ArrowIcon />
            </button>

            {isOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 1000, background: "white", border: "1px solid #ddd", borderRadius: "8px", padding: "5px" }}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        inline
                        locale={ko}
                        dateFormat="yyyy년 MM월 dd일"
                        showYearDropdown // 년도 드롭다운 활성화
                        scrollableYearDropdown // 스크롤 가능한 년도 드롭다운 활성화
                        yearDropdownItemNumber={30} // 드롭다운에서 보여줄 년도 개수 (30개)
                        minDate={type === 1 && startDate ? startDate : null} // 종료일 선택 시 시작일 이후만 가능
                        maxDate={type === 0 && endDate ? endDate : null} // 시작일 선택 시 종료일 이전만 가능
                    />
                </div>
            )}
        </div>
    );
}

export function PaymentCard({ data, selectedIndex, initSettingDone}) {

    useEffect(() => {
        console.log(data,"!!!")
    },[selectedIndex])

    return (

        <div className={styles.recordCardContainer}>

            {
                initSettingDone && selectedIndex != -1 ?
                    <div>
                        <div className={styles.recordCardItemContainer}>
                            <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                결제항목
                            </div>

                            <div className={`${styles["recordCardItemBody"]} ko-md-24`}>
                                {data[selectedIndex].title}
                            </div>

                        </div>
                        <div className={styles.recordCardItemContainer}>
                            <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                결제금액
                            </div>

                            <div className={`${styles["recordCardItemBody"]} ko-md-24`}>
                                {`${data[selectedIndex].amount.toLocaleString()}원`}
                            </div>
                            <div style={{ height: "0.25rem" }} />

                            {Object.entries(data[selectedIndex].amountInfo).map(([item, amount], index) => (
                                <div className={`${styles["recordCardItemDetail"]} ko-reg-15`} key={index}>
                                    {item}: {amount.toLocaleString()}원
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
                                    {new Date(data[selectedIndex].payDate)
                                        .toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })
                                        .replaceAll('. ', '/')
                                        .replace('.', '')}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={styles.recordCardItemContainer}>
                            <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                결제수단
                            </div>

                            <div className={`${styles["recordCardItemBody"]} ko-md-24`}>
                                {`${`${data[selectedIndex].method}`}`}
                            </div>
                        </div>

                        <div className={styles.recordCardItemContainer}>
                            <div className={styles.recordCardDateContainer}>
                                <div className={styles.recordDateItem}>
                                    <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                        담당 학원명
                                    </div>

                                    <div className={`${styles["recordCardDateItemContent"]} ko-sb-20`}>
                                        {`${`${data[selectedIndex].manageAcademy}`}`}
                                    </div>
                                </div>
                                <div style={{ width: "5rem" }} />
                                <div className={styles.recordDateItem}>
                                    <div className={`${styles["recordCardItemHeader"]} ko-md-17`}>
                                        담당 선생님
                                    </div>

                                    <div className={`${styles["recordCardDateItemContent"]} ko-sb-20`}>
                                        {`${`${data[selectedIndex].manager}`}`}
                                    </div>
                                </div>
                            </div>

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
                            목록을 <span dangerouslySetInnerHTML={{ __html: "클릭해<br />" }} /> 상세 내역을 확인해보세요!
                        </div>
                    </div>
            }

        </div>
    )
}

