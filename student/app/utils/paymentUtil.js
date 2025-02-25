export async function readPaymentPendingInfo(startDate, endDate){
    try{
        const response = await fetch('http://localhost:8080/payment/readPendingForStudent', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDate : startDate,
                endDate : endDate
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.result

        return result;
    }catch(e){
        console.log(`결제 팬딩 읽기 중 오류 발생 :  ${e}`)
        throw new Error("결제 팬딩 읽기 중 오류 발생")
    }
}


export async function readPaymentRecordInfo(startDate, endDate){
    try{
        const response = await fetch('http://localhost:8080/payment/readRecordForStudent', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDate : startDate,
                endDate : endDate
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.result

        return result;
    }catch(e){
        console.log(`결제 기록 읽기 중 오류 발생 :  ${e}`)
        throw new Error("결제 기록 읽기 중 오류 발생")
    }
}

export async function getUserInfo(){
    try{

        const response = await fetch('http://localhost:8080/student/readMyInfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.students

        return result;
    }catch(e){
        throw new Error("내 정보 읽기 중 문제 발생")
    }
}




