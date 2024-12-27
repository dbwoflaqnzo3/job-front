"use client";
import styles from '../../styles/studentSVEdit.module.css';
import { useSearchParams } from "next/navigation";
import { useState , useEffect } from "react";
import { posts } from '../../../data'
import Form from './form';


const EditPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const title = searchParams.get("title");

  const data = posts[postId-1];

  const [status, setStatus] = useState(data.status);
  const [content, setContent] = useState(data.content);
  const [category, setCategory] = useState(data.category);

  const handleEditClick = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/posts/updatePost', {
        method: 'POST', // 또는 PUT 요청 사용 가능
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          title, 
          category, 
          content, 
          status: status, // 상태도 함께 전송
        }),
      });

      if (response.ok) {
        alert('수정된 내용이 저장되었습니다.');
      } else {
        console.error('수정 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('서버와 연결하는 중 오류가 발생했습니다.', error);
    }
  }

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  
  //내일 get fetch 받을거 // 내용에 원래 내용을 가져와야됨 ( 사실 젤 빡셈 ㅋ )
  const answer = 'dmddo'


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>고객센터 - 글수정</h1>

      {/* Form 컴포넌트에 필요한 props 전달 */}
      <Form
        postId={postId}
        title={title}
        category={category}
        content={content}
        status={status}
        answer={answer}
        onCategoryChange={handleCategoryChange}
        onContentChange={handleContentChange}
        onSubmit={handleEditClick}
      />
    </div>
  );
};

export default EditPage;
