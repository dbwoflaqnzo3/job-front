"use client";
import styles from '../../styles/studentSVEdit.module.css';
import { useSearchParams } from "next/navigation";
import { useState , useEffect } from "react";
import { posts } from '../../../data'


const EditPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const title = searchParams.get("title");

  const data = posts[postId-1];

  const [status, setStatus] = useState(data.status);
  const [answer, setAnswer] = useState(data.answer);
  const [content, setContent] = useState(data.content);
  const [category, setCategory] = useState(data.category);

  const handleEditClick = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/updatePost', {
        method: 'POST', // 또는 PUT 요청 사용 가능
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          title, 
          category, 
          content, 
          answer,
          status: status, // 상태도 함께 전송
        }),
      });

      if (response.ok) {
        alert('수정된 내용이 저장되었습니다.');
        // 성공적으로 저장된 후 페이지 전환 혹은 상태 변경 처리
      } else {
        console.error('수정 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('서버와 연결하는 중 오류가 발생했습니다.', error);
    }
  }

  // const handleAnswerChange = (e) => {
  //   setAnswer(e.target.value);
  // };



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>고객센터</h1>

      <form onSubmit={handleEditClick}>
        <div className={styles.row}>
          <label className={styles.textLabel}>제목:</label>
          <input
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => {}}
            disabled // 제목은 수정 불가능
          />
        </div>

        <div className={styles.row}>
          <label className={styles.textLabel}>카테고리:</label>
          <input
            type="text"
            className={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)} // 카테고리 수정 가능
          />
        </div>

        <div className={styles.row}>
          <label className={styles.textLabel}>등록자:</label>
          <input
            type="text"
            className={styles.input}
            value={data.author}
            disabled // 등록자는 수정 불가능
          />
        </div>

        <div className={styles.row}>
          <label className={styles.textLabel}>내용:</label>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)} // 내용 수정 가능
            disabled={status === 1} // 상태가 '처리완료'일 때는 수정 불가능
          />
        </div>

        <div className={styles.row}>
          <label className={styles.textLabel}>상태:</label>
          <input
            type="text"
            className={styles.input}
            value={status === 0 ? '답변대기' : '처리완료'}
            disabled // 상태는 수정 불가능
          />
        </div>

        <div className={styles.row}>
          <label className={styles.textLabel}>답변:</label>
          <textarea
            className={styles.textarea}
            value={answer || '답변을 준비 중입니다.'}
            onChange={(e) => setAnswer(e.target.value)} // 답변 수정 가능
            disabled={status === 1} // 상태가 '처리완료'일 때는 수정 불가능
          />
        </div>

        <div className={styles.buttonContainer}>
          {status === 0 ? (
            <button type="submit" className={styles.button}>수정하기</button>
          ) : null}

          {status === 0 ? (
            <button className={styles.button}>삭제하기</button>
          ) : null}

          <button className={styles.button}>목록보기</button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
