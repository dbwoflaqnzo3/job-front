export async function createProgress(_id){
    
    const apiUrl = "http://localhost:8080/progress/create"
    
    try{
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentLessonId : _id,
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.progress

        return result;
    }
    catch(e){
        throw new Error("progress 생성 중 문제 발생")
    }
}

export async function updateProgress(_id, type, progressLevel){

    const apiUrl = "http://localhost:8080/progress/update"

    try{
        const response = await fetch(apiUrl, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id : _id,
                type : type,
                progressLevel: progressLevel
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            const er = await response.json()
            console.log(er.message)
            throw new Error(`HTTP error! status: ${response.status} message :  ${er.message}`);
        }

        const temp_result = await response.json();
        const result = temp_result.progress

        return result;
    }
    catch(e){
        throw new Error("단어 다중 읽기 중 문제 발생")
    }
}

export async function readProgress(_id){

    const apiUrl = "http://localhost:8080/progress/read"

    try{
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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