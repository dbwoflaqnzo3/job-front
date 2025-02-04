<<<<<<< HEAD
<<<<<<< HEAD
export async function getMyInfo(){
=======
export async function getMyInfo(token){
>>>>>>> 4a4e2d7 (feat[#35] :  1차 구현 마무리)
=======
export async function getMyInfo(){
>>>>>>> b6f0872 (feat[#36] : 달력 제작 완료)
    try{

        const response = await fetch('http://localhost:8080/student/readMyInfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
<<<<<<< HEAD
<<<<<<< HEAD
=======
                'Authorization': `Bearer ${token}`, // Authorization 헤더 추가
>>>>>>> 4a4e2d7 (feat[#35] :  1차 구현 마무리)
=======
>>>>>>> b6f0872 (feat[#36] : 달력 제작 완료)
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




