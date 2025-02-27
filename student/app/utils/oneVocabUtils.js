export async function readONEVocabData(curriculumId, lessonId , sequence){

    // 'http://localhost:8080/vocabData/readManyVocab'

    // 아래는 로컬 테스트 서버 주소 
    const apiUrl = '/api/posts/onevoca'; // Test API 서버 주소
    try{
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                curriculumId : curriculumId,
                lessonId : lessonId,
                sequence : sequence,
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