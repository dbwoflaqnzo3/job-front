export async function getUserInfo(token){
    try{

        const response = await fetch('http://localhost:8080/student/readMyInfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Authorization 헤더 추가
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
        throw new Error("단어 다중 읽기 중 문제 발생")
    }
}