"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=""></nav>
  );
}