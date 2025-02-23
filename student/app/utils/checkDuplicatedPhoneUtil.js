export async function checkStudentPhone(studentNumber){
    try{
        const response = await fetch('http://localhost:8080/student/checkDuplicatedPhoneNumber', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: studentNumber
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
        throw new Error(`학생 연락처 조회 중 문제 발생 : ${e}`)
    }
}

export async function changePhoneNumber(phone) {
    try {
        const response = await fetch('http://localhost:8080/student/studentUpdateStudent', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber: phone }),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.message
        console.log(response.status)
        return response.status;
    } catch (e) {
        throw new Error(`연락처 변경 중 문제 발생 : ${e}`)
    }
}