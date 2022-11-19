import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { user, register, emailSignIn } = useAuthContext();

    const router = useRouter();

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        try {
            register(email, password)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (user)
            router.push('/');
    }, [user]);

    return (
        <div 
          className="z-[9] absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-cover bg-center"
          style={{backgroundImage: "url('https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg')"}}
        >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60" />
            <div className="relative w-[90%] max-w-[420px] m-auto bg-black/70 p-8 rounded-lg">
                <div
                  className='absolute top-4 right-4 cursor-pointer'
                  onClick={() => router.push('/')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h3 className="text-xl md:text-2xl pb-4 font-bold text-center uppercase">Register</h3>
                <div className="py-4 border-t-2 border-gray-300/30">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
                        <input 
                            onChange={event => setEmail(event.target.value)}
                            className="p-2 my-2 bg-[#424242] rounded"
                            type="email" 
                            placeholder="Email" 
                            autoComplete="email" 
                        />
                        <input 
                            onChange={event => setPassword(event.target.value)}
                            className="p-2 mt-2 bg-[#424242] rounded"
                            type="password" 
                            placeholder="Password" 
                            autoComplete="current-password" 
                        />
                        <button 
                            className="my-2 mr-6 px-4 py-2 w-full rounded text-lg font-semibold bg-[red]"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <p><input className="mr-1" type="checkbox"/> Remember me</p>
                        <p>Need help?</p>
                    </div>
                    <p className="text-gray-500 pt-2">Already have an account? <Link className="text-white" href='/sign-in'>Sign in.</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register;