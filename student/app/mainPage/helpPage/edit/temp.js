"use client";
import { posts } from '@/data'
import { useRouter } from "next/navigation"

const Form = ({Content, Status, Answer, onContentChange, onSubmit , onDelete}) => {
    const data = posts[postId-1];
    let router = useRouter();

    const goSVPage = (e) => {
        e.preventDefault();
        router.push('/studentService');
    }

    return (
<form onSubmit={onSubmit}>
{/* 여기가 추가부분 */}
  <div>
    <div>
      <div>
        <label>내용</label>
        <textarea
          value={content}
          onChange={onContentChange} // 내용 수정 가능
          disabled={Status === 1} // 상태가 '처리완료'일 때는 수정 불가능
        />
      </div>

      <div>
      <div>
            <label>답변</label>
            <span>{Status === 0 ? '답변대기' : '처리완료' }</span>
        </div>
        <textarea
          value={answer || '답변을 준비 중입니다.'}
          disabled // 답변은 수정 불가능
        />
      </div>
    </div>
  </div>

  {/* 여기서 계정 정보 확인 필요함  */}
  <div>
    <button type="button" onClick={onDelete}>
      삭제하기
    </button>
    {Status === 0 && (
      <>
        <button type="submit">
          수정하기
        </button>
      </>
    )}
  </div>
</form>

  );
};

export default Form;