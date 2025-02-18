'use client'
import { useState } from "react";

import { PageLayout } from '@/app/page.js';
import SizedBox from "@/app/widgets/structure/SizedBox";
import { Grid, Column, Row } from "@/app/widgets/structure/Grid";
import { Button1, Button5 } from "@/app/components/ui/buttons/Regular";
import TextField from "@/app/components/ui/TextField";
import { DropdownButton2 , DropdownElement } from "@/app/components/ui/buttons/Dropdown";


export default function studentService(){

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrdering, setSelectedOrdering] = useState(null);



    return(
        <PageLayout>
        <h1>고객센터</h1>
        <SizedBox height={32}/>
            <Grid column={1} gap="20px" style={{ textAlign: "center", padding: "20px" }}>

                {/* 검색 & 필터 Row */}
                <Row justifyContent="space-between" gap="15px">
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
                    <Row justifyContent="end" gap="15px">
                        <TextField placeholder={true} width={360} ></TextField>
                        <SizedBox width={50} height={32}/>
                        <Button5 width={126} text={`찾기`} >찾기</Button5>
                    </Row>
                </Row>
            </Grid>
        </PageLayout>   
    )
}