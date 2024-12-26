"use client";
import styles from '../../styles/studentWrite.module.css';
import Link from 'next/link';

const writePage = () => {
  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <h1>고객센터 - 글쓰기</h1>
      </header>
      <form>
        <div className={styles.rowGroup}>
          {/* 제목 */}
          <div className={`${styles.formGroup} ${styles.titleGroup}`}>
            <label className={styles.textLabel} htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              className={styles.input}
              placeholder="아이디는 어떻게 찾나요?"
              required
            />
          </div>
          
          {/* 카테고리 */}
          <div className={`${styles.formGroup} ${styles.categoryGroup}`}>
            <label className={styles.textLabel} htmlFor="category">카테고리</label>
            <select id="category" className={styles.input} required>
              <option value="로그인">로그인</option>
              <option value="회원가입">회원가입</option>
              <option value="기타">기타</option>
            </select>
          </div>
          
          {/* 등록자 */}
          <div className={`${styles.formGroup} ${styles.authorGroup}`}>
            <label className={styles.textLabel} htmlFor="author">등록자</label>
            <input
              type="text"
              id="author"
              className={styles.input}
            />
          </div>
        </div>

        {/* 내용 입력 */}
        <div className={styles.formGroup}>
          <label className={styles.textLabel} htmlFor="content">내용</label>
          <textarea
            id="content"
            className={styles.textarea}
            placeholder="내용을 입력해주세요"
            required
          ></textarea>
        </div>

        {/* 버튼 */}
        <div className={styles.buttons}>
          <button type="submit" className={styles.btnSubmit}>
            등록하기
          </button>
          <Link href="/studentService" className={styles.btnCancel}>
            목록보기
          </Link>
        </div>
      </form>
    </div>
  );
};

export default writePage;
