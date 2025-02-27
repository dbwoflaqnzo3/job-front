export async function readAllVocabData(_id){

    // 'http://localhost:8080/vocabData/readManyVocab'

    // 아래는 로컬 테스트 서버 주소 
    // const apiUrl = '/api/posts/voca'; // Test API 서버 주소
    const apiUrl = "http://localhost:8080/vocabData/readManyVocab"
    try{
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id : _id,
                sequence : [-1],
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
    }
    catch(e){
        throw new Error("단어 다중 읽기 중 문제 발생")
    }
}

export async function readStudentLessonInfo(_id){

    // 아래는 로컬 테스트 서버 주소 
    // const apiUrl = '/api/posts/voca'; // Test API 서버 주소
    
    try{
        const response = await fetch("http://localhost:8080/studentLesson/read", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchType : 1,
                _id : _id,
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
    }
    catch(e){
        throw new Error("단어 다중 읽기 중 문제 발생")
    }
}