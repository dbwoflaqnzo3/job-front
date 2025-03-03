'use client'
import React from 'react';
import styles from "./listItem.module.css";
import Link from "next/link";
import { useState , useEffect } from 'react';

// 게시물 데이터 예시 (실제 데이터는 서버에서 가져와야됨)



const ListItem = () => {
    const [posts , setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/posts');
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setPosts(data.posts || []);
            } else {
                console.error('서버 오류', res.message);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className={styles.postList}>

            <div className={styles.header}>
                <div className={styles.postItem}>번호</div>
                <div className={styles.postItem}>카테고리</div>
                <div className={styles.postItem}>제목</div>
                <div className={styles.postItem}>등록자</div>
                <div className={styles.postItem}>등록일</div>
                <div className={styles.postItem}>상태</div>
            </div>

            {posts.map((post, index) => (
                <div 
                    key={post.id} 
                    className={`${styles.postItems} ${post.category === '공지사항' ? styles.notice : styles.normalPost}`}
                >
                    <div className={styles.postItem}>{index + 1}</div>
                    <div className={styles.postItem}>{post.category}</div>
                    <Link
                        href={{
                            pathname: "helpPage/edit",
                            query: { postId: post.id, title: post.title },
                        }}
                    >
                        <div className={styles.postItem} style={{ cursor: "pointer", textDecoration: "none" }}>
                            {post.title}
                        </div>
                    </Link>
                    <div className={styles.postItem}>{post.author}</div>
                    <div className={styles.postItem}>{post.date}</div>
                    <div className={styles.postItem}>{post.status ? '처리완료' : '답변대기'}</div>
                </div>
            ))}
        </div>
    );
};


export default ListItem;