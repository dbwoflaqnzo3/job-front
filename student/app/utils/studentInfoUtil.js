export async function readStudentInfo(){
    try{

        const response = await fetch('http://localhost:8080/student/readMyInfo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(document.cookie),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.students

    //    console.log(result,"~~!~!~!~!") 

        return result;
    }catch(e){
        throw new Error(`학생 정보 조회 중 문제 발생 : ${e}`)
    }
}