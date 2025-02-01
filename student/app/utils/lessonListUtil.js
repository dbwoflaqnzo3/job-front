export async function getMyInfo(token){
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
        throw new Error(`학생 정보 불러오기 중 문제 발생 : ${e}`)
    }
}


export async function getCardInfo(studentId){
    try{

        const now = new Date()

        const response = await fetch('http://localhost:8080/studentLesson/read', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchType : 3,
                searchDate : now,
                studentId : studentId,
            }),
            credentials: 'include',
        });

        if (!response.ok) {

            if(response.status == 400)
                return []

            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.result

        return result;
    }catch(e){
        throw new Error("학생 학습 읽기 중 문제 발생")
    }
}




