import React from 'react';
import styles from "../styles/sSlistItem.module.css"; // 스타일 파일을 import
import Link from "next/link";

// 게시물 데이터 예시 (실제 데이터는 서버에서 가져와야됨)
const posts = [
  { id: 1, category: '웹 개발', title: 'React 기본 튜토리얼', author: '홍길동', date: '2024-01-01', status: '완료' },
  { id: 2, category: '프로그래밍', title: 'Node.js 입문', author: '김철수', date: '2024-02-15', status: '진행 중' },
  { id: 3, category: '디자인', title: 'Figma 디자인 팁', author: '이영희', date: '2024-03-10', status: '대기' },
  // 추가 게시물 데이터
];

const listItem = () => {

    return (
        <div className={styles.postList}>
        {posts.map((post, index) => (
            <div key={post.id} className={styles.navbar}>
            <div className={styles.navbarItem}>{index + 1}</div> {/* 번호는 인덱스에 1을 더해서 표시 */}
            <div className={styles.navbarItem}>{post.category}</div>
            <Link
                href={{
                    pathname: "/studentService/edit",
                    query: { postId: post.id, title: post.title },
                }}
                >
                <div className={styles.navbarItem} style={{ cursor: "pointer", color: "blue" }}>
                    {post.title}
                </div>
            </Link>
            <div className={styles.navbarItem}>{post.author}</div>
            <div className={styles.navbarItem}>{post.date}</div>
            <div className={styles.navbarItem}>{post.status}</div>
            </div>
        ))}
        </div>
    );
    };

export default listItem;
