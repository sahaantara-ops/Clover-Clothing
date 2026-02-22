"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';


const NavLink = ({href,children}) => {
    const path =  usePathname();
    return <Link className='bg-gray-200' href={href}>{children}</Link>;
};

export default NavLink;