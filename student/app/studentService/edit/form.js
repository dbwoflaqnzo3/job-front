"use client";
import styles from '../../styles/studentSVEdit.module.css';
import { posts } from '../../../data'


const Form = ({postId, title, category, content, status, answer, onCategoryChange, onContentChange, onSubmit }) => {
    const data = posts[postId-1];
        
    return (
        <form onSubmit={onSubmit}>
        <div className={styles.row}>
            <label className={styles.textLabel}>제목:</label>
            <input
            type="text"
            className={styles.input}
            value={title}
            disabled // 제목은 수정 불가능
            />
        </div>

        <div className={styles.row}>
            <label className={styles.textLabel}>카테고리:</label>
            <input
            type="text"
            className={styles.input}
            value={category}
            onChange={onCategoryChange} // 카테고리 수정 가능
            disabled={status === 1}
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
            onChange={onContentChange} // 내용 수정 가능
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
            disabled // 상태가 '처리완료'일 때는 수정 불가능
            />
        </div>

        <div className={styles.buttons}>
            {status === 0 ? (
            <button type="submit" className={styles.btnSubmit}>수정하기</button>
            ) : null}

            {status === 0 ? (
            <button className={styles.btnCancel}>삭제하기</button>
            ) : null}

            <button className={styles.btnCancel}>목록보기</button>
        </div>
        </form>
  );
};

export default Form;
