'use client'

export default function ChangePw(){

    const handleSubmit = () =>{

    }

    return (
        <div>
            <h4>비밀번호 변경하기</h4>
            <form onSubmit={handleSubmit}>
                <p>새 비밀번호를 작성해주세요</p>
                <input type="password" placeholder="비밀번호/password"></input> 

                <p>한번 더 작성해주세요</p>
                <input type="password" placeholder="비밀번호/password"></input>

                <button type="submit">변경하기</button>
            </form>
        </div>     
    )
}