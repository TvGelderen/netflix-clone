import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NavData } from './NavData'

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <div className={`z-[9] absolute flex justify-between left-0 top-0 w-full ease-in duration-300`}>
            <div className='flex items-center'>
                <Link href='/'>
                    <Image
                      src='/netflix_logo.png'
                      alt='netflix logo'
                      height={70}
                      width={150}
                      priority
                      className="m-3"
                    />
                </Link>

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
            <div className='flex justify-center items-center mr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <div className='relative group'>
                    <Image 
                      src='/netflix-avatar.png'
                      alt='avatar'
                      width={60}
                      height={60}
                      className='w-12 ml-4 py-2 cursor-pointer'
                      onClick={() => router.push('/profile')}
                    />
                    <div className='absolute flex-col right-0 p-2 bg-black rounded hidden group-hover:flex'>
                        <Link href='/lists' className='m-2 hover:text-[#959595]'>My List</Link>
                        <Link href='/profile' className='m-2 hover:text-[#959595]'>Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
