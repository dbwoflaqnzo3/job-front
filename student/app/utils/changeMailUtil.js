export async function sendVerifyCode(mail) {
    try {
        const response = await fetch('http://localhost:8080/verifyService/createForUpdate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: mail }),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = { json: temp_result, status: response.status };
        return result;
    } catch (e) {
        throw new Error(`인증번호 전송 중 문제 발생 : ${e}`)
    }
}

export async function verifyMail(id, vCode) {
    try {
        const response = await fetch('http://localhost:8080/verifyService/verify', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                code: vCode
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.status;
        console.log(result, "!!!@@@!!!@@@")
        return result;
    } catch (e) {
        throw new Error(`이메일 인증 중 문제 발생 : ${e}`)
    }
}

export async function updateEmail(mail) {
    try {
        const response = await fetch('http://localhost:8080/student/studentUpdateStudent', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: mail }),
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
        throw new Error(`이메일 변경 중 문제 발생 : ${e}`)
    }
}