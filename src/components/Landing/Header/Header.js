"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = ['Home', 'About', 'Buy', 'Articles', 'Contact']

  return (
    <>
      <header className="bg-[#000] top-0 fixed z-20 w-full left-0 p-[10px] pb-[23px] pt-[22px] md:p-[30px]">
        {/* Desktop Nav */}
        <nav className='hidden md:flex justify-between items-center'>
          <Link href='/'>
            <img src="/assets/header/pekyicon.jpeg" alt="main-icon" className='h-[25px]' />
          </Link>

          <div className='flex items-center gap-[50px]'>
            <ul className="flex gap-12">
              {menuItems.map((item) => (
                <li key={item} className="group relative text-white cursor-pointer">
                  <a href={`#${item}`} className="relative">{item}</a>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav className='flex md:hidden justify-between items-center'>
          <Link href='/'>
            <img src="/assets/header/pekyicon.jpeg" alt="main-icon" className='h-[25px]' />
          </Link>
          {/* Hamburger Icon */}
          <button onClick={() => setIsOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36">
              <path
                d="M31.5057 18C31.5057 18.298 31.3873 18.5838 31.1766 18.7945C30.9659 19.0052 30.6801 19.1236 30.3821 19.1236H5.66337C5.36538 19.1236 5.0796 19.0052 4.86888 18.7945C4.65817 18.5838 4.53979 18.298 4.53979 18C4.53979 17.702 4.65817 17.4163 4.86888 17.2055C5.0796 16.9948 5.36538 16.8765 5.66337 16.8765H30.3821C30.6801 16.8765 30.9659 16.9948 31.1766 17.2055C31.3873 17.4163 31.5057 17.702 31.5057 18ZM5.66337 10.135H30.3821C30.6801 10.135 30.9659 10.0166 31.1766 9.80589C31.3873 9.59518 31.5057 9.30939 31.5057 9.0114C31.5057 8.71341 31.3873 8.42762 31.1766 8.21691C30.9659 8.00619 30.6801 7.88782 30.3821 7.88782H5.66337C5.36538 7.88782 5.0796 8.00619 4.86888 8.21691C4.65817 8.42762 4.53979 8.71341 4.53979 9.0114C4.53979 9.30939 4.65817 9.59518 4.86888 9.80589C5.0796 10.0166 5.36538 10.135 5.66337 10.135ZM30.3821 25.8651H5.66337C5.36538 25.8651 5.0796 25.9835 4.86888 26.1942C4.65817 26.4049 4.53979 26.6907 4.53979 26.9887C4.53979 27.2867 4.65817 27.5724 4.86888 27.7832C5.0796 27.9939 5.36538 28.1122 5.66337 28.1122H30.3821C30.6801 28.1122 30.9659 27.9939 31.1766 27.7832C31.3873 27.5724 31.5057 27.2867 31.5057 26.9887C31.5057 26.6907 31.3873 26.4049 31.1766 26.1942C30.9659 25.9835 30.6801 25.8651 30.3821 25.8651Z"
                fill="#FFF"
              />
            </svg>
          </button>
        </nav>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-black/50 bg-opacity-50  z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Off-canvas Menu (Left, 80% Width) */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-[#000] z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-center !mb-[30px] pt-[30px] p-4">
          <img src="/assets/header/pekyicon.jpeg" alt="main-icon" className='h-[25px]' />
        </div>
        <ul className="flex flex-col  !p-6 text-white text-left">
          {menuItems.map((item) => (
            <li key={item} className="group relative cursor-pointer border-b-[1px] pb-[10px] !mb-[10px] border-white">
              <a href={`#${item}`} className="relativ ">{item}</a>
              <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Header
