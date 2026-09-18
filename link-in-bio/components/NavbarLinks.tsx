"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({href, children} : {href: string; children: React.ReactNode}){
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link href={href} style={{ fontWeight: isActive ? "bold" : "normal" }}>
            {children}
        </Link>
    );
}