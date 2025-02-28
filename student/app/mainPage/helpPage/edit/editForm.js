"use client";
import { posts } from '@/data'
import { useRouter } from "next/navigation"

const Form = ({postId, title, category, content, status, answer, onCategoryChange, onContentChange, onSubmit , onDelete}) => {
    const data = posts[postId-1];
    let router = useRouter();

    const goSVPage = (e) => {
        e.preventDefault();
        router.push('/studentService');
    }

    return (
<form onSubmit={onSubmit}>
  <div>
    <div>
      <label>제목</label>
      <input
        type="text"
        value={title}
        disabled={status === 1} // 제목은 수정 불가능
      />
    </div>

    <div>
      <label>카테고리</label>
      <select id="category" name="category"
       required
        value={category}
        onChange={onCategoryChange}
        disabled={status === 1}
      >
              <option value="로그인">로그인</option>
              <option value="회원가입">회원가입</option>
              <option value="기타">기타</option>
      </select>
    </div>

    <div>
      <label>등록자</label>
      <input
        type="text"
        value={data.author}
        disabled // 등록자는 수정 불가능
      />
    </div>
  </div>

{/* 여기가 추가부분 */}
  <div>
    <div>
      <div>
        <label>내용</label>
        <textarea
          value={content}
          onChange={onContentChange} // 내용 수정 가능
          disabled={status === 1} // 상태가 '처리완료'일 때는 수정 불가능
        />
      </div>

      <div>
      <div>
            <label>답변</label>
            <span>{status === 0 ? '답변대기' : '처리완료'}</span>
        </div>
        <textarea
          value={answer || '답변을 준비 중입니다.'}
          disabled // 답변은 수정 불가능
        />
      </div>
    </div>
  </div>


  <div>
    {status === 0 && (
      <>
        <button type="submit">
          수정하기
        </button>
        <button type="button" onClick={onDelete}>
          삭제하기
        </button>
      </>
    )}
    <button
      type="button"
      onClick={goSVPage}
    >
      목록보기
    </button>
  </div>
</form>

  );
};

export default Form;