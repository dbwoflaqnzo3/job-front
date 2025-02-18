'use client'
import styles from "./helpPage.module.css";

import { PageLayout } from '@/app/page.js';
import SizedBox from "@/app/widgets/structure/SizedBox";
import { Grid, Column, Row } from "@/app/widgets/structure/Grid";
import { Button1, Button5 } from "@/app/components/ui/buttons/Regular";
import TextField from "@/app/components/ui/TextField";
import { DropdownButton2 } from "@/app/components/ui/buttons/Dropdown";

export default function studentService(){
    return(
        <PageLayout>
        <h1>고객센터</h1>
        <SizedBox height={32}/>
            <Grid column={1} gap="20px" style={{ textAlign: "center", padding: "20px" }}>

                {/* 검색 & 필터 Row */}
                <Row justifyContent="space-between" gap="15px">
                    
                    {/* 카테고리 선택 */}
                    {/* <select>
                    <option>카테고리</option>
                    </select> */}

                    {/* 정렬 선택 */}
                    {/* <select>
                    <option>최신순</option>
                    </select> */}

                    <Row justifyContent="center" gap="15px">
                        <DropdownButton2>최신순</DropdownButton2>
                    </Row>
                    <Row gap="15px">
                        <TextField placeholder={true} width={360} ></TextField>
                        <SizedBox width={50} height={32}/>
                        <Button5 width={126} text={`찾기`} >찾기</Button5>
                    </Row>
                </Row>
            </Grid>
        </PageLayout>   
    )
}