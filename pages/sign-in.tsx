import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import GoogleButton from 'react-google-button';
import { useAuthContext } from "../context/AuthContext";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { user, emailSignIn, googleSignIn } = useAuthContext();

    const router = useRouter();

    const handleGoogleSignIn = () => {
        try {
            googleSignIn();
        } catch(error) {
            console.error(error);
        }
    }

    const handleSubmit = () => {
        try {
            emailSignIn(email, password);
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
            <div className="relative w-[90%] sm:w-[75%] md:w-[90%] lg:w-[900px] m-auto bg-black/70 px-4 pt-4 rounded-lg">
                <div
                  className='absolute top-4 right-4 cursor-pointer'
                  onClick={() => router.push('/')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h3 className="text-xl md:text-2xl pb-4 font-bold text-center uppercase">Sign In</h3>
                <div className="py-4 border-t-2 border-gray-300/30 grid md:grid-cols-2">
                    <div className="col-span-1 flex justify-center">
                        <GoogleButton onClick={handleGoogleSignIn} />
                    </div>
                    <div className="col-span-1 md:border-l-2 border-gray-300/30 pl-5">
                        <h4 className="text-xl font-semibold">Login</h4>
                        {error && <p className="text-[red] pt-2">{error}</p>}
                        <form className="w-full flex flex-col py-4 pr-2">
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
                        </form>

                        <button 
                          className="mt-2 mr-4 px-4 py-2 rounded text-lg font-semibold bg-[red]"
                          onClick={handleSubmit}
                        >
                            Sign In
                        </button>
                        <button 
                          className="mt-2 px-4 py-2 rounded text-lg font-semibold bg-[#3f3f3f]"
                          onClick={() => router.push('/register')}
                        >
                            Register
                        </button>
                        <div className="flex justify-between mt-4 text-sm text-gray-500">
                            <p><input className="mr-1" type="checkbox"/> Remember me</p>
                            <p>Need help?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;