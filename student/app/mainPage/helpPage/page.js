'use client'
<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
import styles from "./helpPage.module.css";
>>>>>>> b147fff (feat: pull받고 고객센터 페이지추가)
=======
import { useState } from "react";
>>>>>>> 4dd0664 (feat[#53]: 글 카테고리 버튼 설정)
=======
>>>>>>> 2eb536d (refactor[#53]: Write페이지 작성완료)

import { PageLayout } from '@/app/page.js';
import SizedBox from "@/app/widgets/structure/SizedBox";
import { Grid, Column, Row } from "@/app/widgets/structure/Grid";
import { Button1, Button5 } from "@/app/components/ui/buttons/Regular";
import TextField from "@/app/components/ui/TextField";
<<<<<<< HEAD
<<<<<<< HEAD
import { DropdownButton2 , DropdownElement } from "@/app/components/ui/buttons/Dropdown";

import ListItem from "./listItem";

export default function studentService(){

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrdering, setSelectedOrdering] = useState(null);

    const router = useRouter();
    const writeContent = () => {
        router.push("/mainPage/helpPage/write");
        // alert("경고: 이 작업을 수행할 수 없습니다!");          
    };


=======
import { DropdownButton2 } from "@/app/components/ui/buttons/Dropdown";

export default function studentService(){
>>>>>>> b147fff (feat: pull받고 고객센터 페이지추가)
=======
import { DropdownButton2 , DropdownElement } from "@/app/components/ui/buttons/Dropdown";

import ListItem from "./listItem";

export default function studentService(){

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrdering, setSelectedOrdering] = useState(null);

    const router = useRouter();
    const writeContent = () => {
        router.push("/mainPage/helpPage/write");
        // alert("경고: 이 작업을 수행할 수 없습니다!");          
    };


>>>>>>> 4dd0664 (feat[#53]: 글 카테고리 버튼 설정)
    return(
        <PageLayout>
        <h1>고객센터</h1>
        <SizedBox height={32}/>
            <Grid column={1} gap="20px" style={{ textAlign: "center", padding: "20px" }}>

                {/* 검색 & 필터 Row */}
                <Row justifyContent="space-between" gap="15px">
<<<<<<< HEAD
<<<<<<< HEAD
                    <Row justifyContent="center" gap="15px">
                    <DropdownButton2 onSelect={(item) => setSelectedCategory(item)} width={140}
                    allowCustom
                    search
                    placeholder="카테고리">           
                        <DropdownElement label="로그인" value="login"/>
                        <DropdownElement label="버그 및 오류" value="bug"/>
                        <DropdownElement label="공지사항" value="alarm"/>
                        <DropdownElement label="기타문의" value="quest"/>
                    </DropdownButton2>
                    <DropdownButton2 onSelect={(item) => setSelectedOrdering(item)} width={140}
                        placeholder="최신순">           
                        <DropdownElement label="최신순" value="time"/>
                        <DropdownElement label="인기순" value="score"/>
                    </DropdownButton2>
                    </Row>
                    <Row justifyContent="center" gap="15px">
                        <TextField placeholder={"제목을 입력해주세요"} width={360} ></TextField>
                        <SizedBox width={50} height={32}/>
                        <Button5 width={126} text={`찾기`} ></Button5>
                    </Row>
                </Row>
            </Grid>
            <SizedBox width={50} height={32}/>

            <ListItem/>
            <SizedBox width={50} height={32}/>

            <Row justifyContent="end">
            <SizedBox width={1003} height={54}/>
            <Button1 width={213} height={54} text={`글쓰기`} onClick={writeContent} ></Button1>
            </Row>

=======
                    
                    {/* 카테고리 선택 */}
                    {/* <select>
                    <option>카테고리</option>
                    </select> */}

                    {/* 정렬 선택 */}
                    {/* <select>
                    <option>최신순</option>
                    </select> */}

=======
>>>>>>> 4dd0664 (feat[#53]: 글 카테고리 버튼 설정)
                    <Row justifyContent="center" gap="15px">
                    <DropdownButton2 onSelect={(item) => setSelectedCategory(item)} width={140}
                    allowCustom
                    search
                    placeholder="카테고리">           
                        <DropdownElement label="로그인" value="login"/>
                        <DropdownElement label="버그 및 오류" value="bug"/>
                        <DropdownElement label="공지사항" value="alarm"/>
                        <DropdownElement label="기타문의" value="quest"/>
                    </DropdownButton2>
                    <DropdownButton2 onSelect={(item) => setSelectedOrdering(item)} width={140}
                        placeholder="최신순">           
                        <DropdownElement label="최신순" value="time"/>
                        <DropdownElement label="인기순" value="score"/>
                    </DropdownButton2>
                    </Row>
                    <Row justifyContent="center" gap="15px">
                        <TextField placeholder={true} width={360} ></TextField>
                        <SizedBox width={50} height={32}/>
                        <Button5 width={126} text={`찾기`} ></Button5>
                    </Row>
                </Row>
            </Grid>
<<<<<<< HEAD
>>>>>>> b147fff (feat: pull받고 고객센터 페이지추가)
=======
            <SizedBox width={50} height={32}/>

            <ListItem/>
            <SizedBox width={50} height={32}/>

            <Row justifyContent="end">
            <SizedBox width={1003} height={54}/>
            <Button1 width={213} height={54} text={`글쓰기`} onClick={writeContent} ></Button1>
            </Row>

>>>>>>> 2eb536d (refactor[#53]: Write페이지 작성완료)
        </PageLayout>   
    )
}