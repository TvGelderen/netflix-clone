import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

import { NavData } from './Navdata'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { user, logOut } = useAuthContext();

    const router = useRouter();

    return (
        <div className='z-[9] fixed flex justify-between left-0 top-0 w-full ease-in duration-300'>
            <div className='flex items-center'>
                <Link href='/'>
                    <Image
                      src='/netflix_logo.png'
                      alt='netflix logo'
                      height={70}
                      width={150}
                      className="m-3"
                    />
                </Link>
                {/* Regular navbar for large screen */}
                <nav className='hidden lg:flex pl-2'>
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
                {user 
                  ? <div className='text-lg'>
                        <button className='mx-4 py-1' onClick={logOut}>
                            <p>Sign Out</p>
                        </button>
                        <button className='px-2 py-1 rounded bg-[red]' onClick={() => router.push('/account')}>
                            <p>Account</p>
                        </button>
                    </div>
                  : <div className='text-lg'>
                        <button className='mx-4 py-1' onClick={() => router.push('/register')}>
                            <p>Register</p>
                        </button>
                        <button className='px-2 py-1 rounded bg-[red]' onClick={() => router.push('/sign-in')}>
                            <p>Sign In</p>
                        </button>
                    </div>}
            </div>

            <div className='lg:hidden flex items-center mr-5 cursor-pointer' onClick={() => setOpen(!open)}>
                {!open && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>}
            </div>

            {open && (
                <div className='lg:hidden'>
                    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50' />
                    <div className='z-[9] fixed top-0 left-0 right-1/4 sm:right-[33%] md:right-1/2 bottom-0 bg-black/90 flex flex-col justify-center items-center'>
                        <div
                          className='absolute top-4 right-4 cursor-pointer'
                          onClick={() => setOpen(!open)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <div className='flex flex-col pb-12 pl-12 w-[80%] border-b-2 border-gray-400'>
                            {NavData.map(item => (
                                <Link 
                                key={item.name} 
                                href={item.path}
                                className="text-2xl sm:text-3xl py-5 tracking-wider"
                                onClick={() => setOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className='justify-center items-center mr-4 mt-12'>
                            {user 
                            ?   <div className='text-lg'>
                                    <button className='mx-4 py-1' onClick={() => {
                                        logOut() 
                                        setOpen(false)
                                    }}>
                                        <p>Sign Out</p>
                                    </button>
                                    <button className='px-2 py-1 rounded bg-[red]' onClick={() => {
                                        setOpen(false)
                                        router.push('/account')
                                      }}>
                                        <p>Account</p>
                                    </button>
                                </div>
                            :   <div className='text-lg'>
                                    <button className='mx-4 py-1' onClick={() => {
                                        setOpen(false)
                                        router.push('/register')
                                    }}>
                                        <p>Register</p>
                                    </button>
                                    <button className='px-2 py-1 rounded bg-[red]' onClick={() => {
                                        setOpen(false)
                                        router.push('/sign-in')
                                    }}>
                                        <p>Sign In</p>
                                    </button>
                                </div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;