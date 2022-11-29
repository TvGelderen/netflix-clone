import React from 'react';
import Image from 'next/image';
import { useAuthContext } from '../context/AuthContext';
import Plans from '../components/Plans';

const Profile: React.FC = () => {
    const { logOut } = useAuthContext();
    
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className='w-[95%] max-w-[700px] m-auto'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-left pb-2 border-b-2 border-[#202020]'>Edit Profile</h1>
                <div className='grid grid-cols-6 py-4 px-2'>
                    <div className='col-span-1'>
                        <Image 
                          src='/netflix-avatar.png'
                          alt='avatar'
                          width={80}
                          height={80}
                          className=''
                        />
                    </div>
                    <div className='col-span-5 mx-4'>
                        <p className='text-xl font-semibold pb-1 border-b-2 border-[#202020]'>Subscription Plans</p>
                        <p className='text-[#aaaaaa] py-2'>Renewal date: (dd/mm/yyyy)</p>

                        <Plans />

                        <button className='w-full py-2 mt-8 rounded bg-[#e50914]' onClick={logOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile