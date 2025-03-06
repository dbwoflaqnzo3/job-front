'use client'; 
import styles from './edit.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { PageLayout } from '@/app/page.js';
import { Grid, Column, Row } from "@/app/widgets/structure/Grid";
import { Button1, Button4 } from "@/app/components/ui/buttons/Regular";
import SizedBox from '@/app/widgets/structure/SizedBox';
import { DropdownButton1 , DropdownElement } from "@/app/components/ui/buttons/Dropdown";
import TextField from "@/app/components/ui/TextField";


const EditForm = ({Category, Title , Content , Answer , Author , Status , HandleUpdate }) => {  
  const [selectedCategory, setSelectedCategory] = useState(Category);
  const [formData , setFormData] = useState({title: Title , content: Content , author: Author})

  const router = useRouter();

  const handleInputChange = (name, value) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // HandleUpdate를 호출하여 부모 컴포넌트의 post 상태 업데이트
    HandleUpdate({
      category: selectedCategory.label,
      ...updatedFormData,
    });
  };

  const handleCategoryChange = (selectedItem) => {
    setSelectedCategory(selectedItem);
  
    // 카테고리가 변경될 때도 HandleUpdate 호출
    HandleUpdate({
      category: selectedItem.label,
      ...formData,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      category: selectedCategory.label, // 테스트라 라벨로 보냄 
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

  const goHelpPage = () => {
    router.push("/mainPage/helpPage");
    // alert("경고: 이 작업을 수행할 수 없습니다!");          
};


  return (
    <>
      <h1>문의하기</h1>
      <SizedBox width={50} height={32}/>
      <Row>
        <SizedBox width={1060}></SizedBox>
        <Button4 width={140} height={40} text={"목록보기"} onClick={goHelpPage}></Button4>
      </Row>

      <div className={styles.gridContainer}>
        <Column >
              <label className={styles.textLabel}>카테고리</label>
              <DropdownButton1 onSelect={handleCategoryChange} width={200} height={54} placeholder={selectedCategory}>
                  <DropdownElement label="로그인" value="login"/>
                  <DropdownElement label="버그 및 오류" value="bug"/>
                  <DropdownElement label="공지사항" value="alarm"/>
                  <DropdownElement label="기타문의" value="quest"/>
              </DropdownButton1>
        </Column>



          <Column justifyContent="center">
            <label className={styles.textLabel} htmlFor="title">제목</label>
              <TextField             
                placeholder={formData.title}
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
              placeholder={formData.author}
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              width={212}
            />
          </Column>
      </div>
      <SizedBox height={30}></SizedBox>
      
      {/* //계정 정보 확인  */}
      {/* 글 자체의 상태 확인  */}
      <div style={{ marginLeft: "30px" }}>
        <Row>
          <Column>
          <label className={styles.textLabel} >내용</label>
          <textarea
          id="content"
          name="content"
          className={styles.summitContentSmall}
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          disabled
          ></textarea>
          </Column>

          <Column>
            <Row>
            <label className={styles.textLabel} >답변</label>
            <span>{Status === 0 ? '답변대기' : '처리완료' }</span>
            </Row>
            <textarea
            id="content"
            name="content"
            className={styles.summitContentSmall}
            value={formData.Answer}
            onChange={(e) => handleInputChange("content", e.target.value)}
            disabled
            ></textarea>
          </Column>
        </Row>
      </div>



    </>
  );
};

export default EditForm;