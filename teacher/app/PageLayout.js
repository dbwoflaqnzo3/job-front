"use client"

import { TeacherNav } from "./components/layout/Nav";
import { Column } from "./widgets/structure/Grid";

export const DefaultPage = ({ children }) => <div className="page">
  {children}
</div>;
export const NavPage = ({ children }) => <div className="page">
  <Column><TeacherNav />{children}</Column>
</div>;