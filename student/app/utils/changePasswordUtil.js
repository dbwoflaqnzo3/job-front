export async function verifyStudentPassword(password) {
    try {
        const response = await fetch('http://localhost:8080/student/verifyStudentPassWord', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
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
        throw new Error(`비밀번호 확인 중 문제 발생 : ${e}`)
    }
}

export async function changePassword(password) {
    try {
        const response = await fetch('http://localhost:8080/student/studentUpdateStudent', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
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
        throw new Error(`비밀번호 변경 중 문제 발생 : ${e}`)
    }
}