import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { FirebaseError } from 'firebase/app'

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<FirebaseError>();

    const { user, register } = useAuthContext();

    const router = useRouter();

    const handleSubmit = async () => {
        register(email, password);
    }

    console.log(error)

    useEffect(() => {
        const emailParam = router.query.email;
        setEmail(emailParam !== undefined && !(emailParam instanceof Array) ? emailParam : '');
    }, []);

    useEffect(() => {
        if (user)
            router.push('/');
    }, [user]);

    return (
        <div 
          className="z-[9] absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-cover bg-center"
          style={{backgroundImage: "url('https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg')"}}
        >            
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black md:bg-black/50 bg-gradient-to-b from-black/70 via-black/0 to-black/70" />
            <div className="absolute top-4 left-4">
                <Image
                  src='/netflix_logo.png'
                  alt=''
                  width={200}
                  height={120}
                  priority
                  className='w-[150px] md:w-[180px] lg:w-[200px] h-auto md:m-2'
                />
            </div>

            <div className="fixed top-0 mt-[100px] w-[90%] md:max-w-[500px] m-auto md:p-16 rounded md:bg-black/70">
                <h3 className="text-4xl font-semibold pb-6">Register</h3>
                {error && <p className='text-[red] pl-1'>{error.code}</p>}
                <form onSubmit={handleSubmit} className="w-full flex flex-col">
                    <input 
                        onChange={event => setEmail(event.target.value)}
                        className="p-4 my-2 bg-[#353535] rounded"
                        type="email"
                        value={email}
                        placeholder="Email" 
                        autoComplete="email" 
                    />
                    <input 
                        onChange={event => setPassword(event.target.value)}
                        className="p-4 my-2 bg-[#353535] rounded"
                        type="password" 
                        placeholder="Password" 
                        autoComplete="current-password" 
                    />
                </form>
                
                <button
                    className="w-full py-3 mt-8 text-lg font-semibold rounded bg-[#e50914] border-[#e50914]"
                    onClick={handleSubmit}
                >
                    Register
                </button>

                <div className="flex justify-between items-center mt-3">
                    <div className="flex">
                        <input 
                        type="checkbox"
                        className=''
                        />
                        <p className="text-[#a7a7a7]">&nbsp;Remember me</p>
                    </div>
                    <div>
                        <p className="text-[#a7a7a7]">Need help?</p>
                    </div>
                </div>

                <div className="flex mt-24">
                    <p className="text-[#a7a7a7] text-lg">Already have an account?&nbsp;</p>
                    <Link href='/login' className='text-lg font-semibold'>Log in.</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;