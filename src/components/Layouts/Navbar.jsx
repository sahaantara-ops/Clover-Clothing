"use client"
import React, { useState, useRef, useEffect } from 'react';
import NavLink from '../Buttons/NavLink';
import Logo from '../Logo/Logo';
import Link from 'next/link';
import { IoMdCart } from "react-icons/io";
import AuthButtons from '../Buttons/AuthButtons';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { RiPageSeparator } from "react-icons/ri";


const Navbar = () => {
  const [showPages, setShowPages] = useState(false);
  const pagesRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setShowPages(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nav = <>
    <li className='text-gray-700 font-sans text-lg'>
      <NavLink href={"/"}><FaHome />Home</NavLink>
    </li>
    <li className='text-gray-700 font-sans text-lg'>
      <NavLink href={"/Products"} > <MdOutlineProductionQuantityLimits /> Products</NavLink>
    </li>
    <li className='text-gray-700 font-sans text-lg'>
      <NavLink href={"/about"}><FcAbout />About</NavLink>
    </li>
    

    {/* Clickable Pages Dropdown */}
    <li
      className="relative text-gray-700 font-sans text-lg"
      onMouseEnter={() => setShowPages(true)}
      onMouseLeave={() => setShowPages(false)}
    >
      {/* Button */}
      <button className="flex items-center gap-1 font-medium hover:text-black transition">
        <RiPageSeparator /> Pages
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <ul
        className={`absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transition-all duration-200 ${
          showPages
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <li>
          <Link
            href="/compare"
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Compare
          </Link>
        </li>

        <li>
          <Link
            href="/my-account/orders"
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition rounded-lg"
          >
            <IoMdCart className="h-5 w-5 text-gray-500" />
            My Orders
          </Link>
        </li>

        <li>
          <Link
            href="/review"
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Review
          </Link>
        </li>
      </ul>
    </li>
  </>;

  return (
    <div className="navbar bg-gray-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-gray-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {nav}
          </ul>
        </div>
        <Logo/>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {nav}
        </ul>
      </div>
      <div className="navbar-end space-x-4">
        <Link href={"/Cart"} className='"btn btn-ghost"'>
          <IoMdCart />
        </Link>
        <AuthButtons />
      </div>
    </div>
  );
};

export default Navbar;