export async function readPeriodStudentLesson(startDate,endDate){
    try{

        const response = await fetch('http://localhost:8080/studentLesson/readPeriodLesson', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDate : startDate,
                endDate : endDate,
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
        throw new Error(`학생 커리큘럼 조회 중 문제 발생 : ${e}`)
    }
}


export async function readSpecificDateLesson(searchDate){
    try{

        const response = await fetch('http://localhost:8080/studentLesson/read', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchDate : searchDate,
                searchType : 2,
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
        throw new Error(`학생 정보 불러오기 중 문제 발생 : ${e}`)
    }
}