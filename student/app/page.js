'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Grid } from "./widgets/structure/Grid";
import { NavGroup, NavTitle, NavIcon, NavItem } from "@/app/components/layout/Nav";

function pageLayout() {
  return (
    <NavGroup theme="primary">
      <NavTitle title="A" onClick={() => {}} />
      <NavTitle title="B" onClick={() => {}} />
      <NavTitle title="C">
        <NavItem text="C-1" onClick={() => {}} />
        <NavItem text="C-2" onClick={() => {}} />
      </NavTitle>
      <NavIcon icon="help" onClick={() => {}} />
      <NavIcon icon="profile">
        <NavItem text="1" onClick={() => {}} />
        <NavItem text="2" onClick={() => {}} />
        <NavItem text="3" onClick={() => {}} />
        <NavItem text="4" textColor="red-3" onClick={() => {}} />
      </NavIcon>
    </NavGroup>
  );
}

export default function Home() {
  return (
    <div>{pageLayout()}</div>
  );
}
