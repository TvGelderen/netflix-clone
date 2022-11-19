import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { NavData } from './Navdata'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='z-[9] fixed flex justify-between left-0 top-0 w-full ease-in duration-300 bg-black/30'>
            <div className='flex items-center'>
                <Link href='/'>
                    <Image
                    src='/netflix_logo.png'
                    alt='netflix logo'
                    height={70}
                    width={120}
                    className="m-5"
                    />
                </Link>
                {/* Regular navbar for large screen */}
                <nav className='hidden lg:flex pl-6'>
                    <div>
                        {NavData.map(item => (
                            <Link 
                              key={item.name} 
                              href={item.path}
                              className="text-lg px-5 hover:text-gray-300 tracking-wide"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
            <div className='hidden lg:flex justify-center items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <div className='text-lg'>
                    <button className='mx-4 py-1'>
                        <p>Register</p>
                    </button>
                    <button className='px-2 py-1 rounded bg-[red] '>
                        <p>Sign In</p>
                    </button>
                </div>
            </div>

            <div className='z-[10] lg:hidden flex items-center mr-5 cursor-pointer' onClick={() => setOpen(!open)}>
                {open 
                  ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>}
            </div>

            {open && (
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black flex flex-col justify-center items-center'>
                    {NavData.map(item => (
                        <Link 
                          key={item.name} 
                          href={item.path}
                          className="text-3xl sm:text-4xl py-5 tracking-wider"
                          onClick={() => setOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Navbar;