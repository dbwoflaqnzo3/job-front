'use client'; 
import styles from './write.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { PageLayout } from '@/app/page.js';
import { Grid, Column, Row } from "@/app/widgets/structure/Grid";
import { Button1, Button4 } from "@/app/components/ui/buttons/Regular";
import SizedBox from '@/app/widgets/structure/SizedBox';
import { DropdownButton1 , DropdownElement } from "@/app/components/ui/buttons/Dropdown";
import TextField from "@/app/components/ui/TextField";

const writePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);  // 제출 상태 관리
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData , setFormData] = useState({title: "" , content:"" , author: ""})

  const router = useRouter();

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      category: selectedCategory.label, // 테스트라 라벨로 보냄 
      content: formData.content,
      author: formData.author,
    };

    try {
      const response = await fetch('/api/posts/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('서버응답', result);
        setIsSubmitted(true);  // 제출 성공 시 상태 변경
      } else {
        console.error('서버오류');
      }
    } catch (err) {
      console.error('요청실패', err);
    }
  };

  if (isSubmitted) {
    return (
      <div>
        <h2>글이 성공적으로 작성되었습니다!</h2>
        <p><a href="/mainPage/helpPage">메인 페이지로 돌아가기</a></p>
      </div>
    );
  }

  const goHelpPage = () => {
    router.push("/mainPage/helpPage");
    // alert("경고: 이 작업을 수행할 수 없습니다!");          
};

  return (
      <PageLayout>
      <h1>문의하기</h1>
      <SizedBox width={50} height={32}/>
      <Row>
        <SizedBox width={1060}></SizedBox>
        <Button4 width={140} height={40} text={"목록보기"} onClick={goHelpPage}></Button4>
      </Row>

      <form onSubmit={handleSubmit}>
      <div className={styles.gridContainer}>
        <Column >
              <label className={styles.textLabel}>카테고리</label>
              <DropdownButton1 onSelect={(item) => setSelectedCategory(item)} width={200} height={54} placeholder="카테고리">
                  <DropdownElement label="로그인" value="login"/>
                  <DropdownElement label="버그 및 오류" value="bug"/>
                  <DropdownElement label="공지사항" value="alarm"/>
                  <DropdownElement label="기타문의" value="quest"/>
              </DropdownButton1>
            </Column>



          <Column justifyContent="center">
            <label className={styles.textLabel} htmlFor="title">제목</label>
              <TextField             
                placeholder={"제목을 입력하세요!"}
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                width={400}
              />
          </Column>
          <Column>
            <SizedBox></SizedBox>
          </Column>


          <Column>
            <label className={styles.textLabel} htmlFor="author">등록자</label>
            <TextField             
              placeholder={"등록자"}
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              width={212}
            />
          </Column>
      </div>
      


      {/* UseState로 상태관리 필요  */}
      <Column>
      <label className={styles.textLabel} htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          className={styles.summitContent}
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          placeholder="내용을 입력해주세요"
          required
        ></textarea>

          {/* // 지금은 컨텐츠빼고 다 제출 됨  */}
        <Row justifyContent="center">
          <Button1 width={212} height={54} text={"등록하기"} onClick={handleSubmit} />
        </Row>
      </Column>


    </form>
    </PageLayout>
  );
};

export default writePage;