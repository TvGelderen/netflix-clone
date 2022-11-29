import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const router = useRouter();

    return (
        <div 
          className="z-[9] absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-cover bg-center"
          style={{backgroundImage: "url('https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg')"}}
        >            
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 bg-gradient-to-b from-black/70 via-black/0 to-black/70" />
            <div className="absolute top-4 left-4">
                <Image
                  src='/netflix_logo.png'
                  alt=''
                  width={200}
                  height={120}
                  className='w-[150px] md:w-[180px] lg:w-[200px] h-auto md:m-2'
                />
            </div>
            <div className="absolute top-6 right-12">
                <button className="px-5 py-1 text-lg rounded bg-[#e50914]" onClick={() => router.push('/login')}>Sign In</button>
            </div>

            <div className="relative flex flex-col justify-center items-center w-[80%] sm:w-[70%] md:w-[60%] max-w-[800px] m-auto">
                <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold">Unlimited films, TV programmes and more.</h1>
                <h5 className="text-xl md:text-2xl lg:text-3xl py-4">Watch anywhere. Cancel at any time.</h5>
                <p className="text-center">Ready to watch? Enter your email to start or restart you membership.</p>

                <div className="w-full max-w-[600px] m-auto pt-4 flex">
                    <input type='email' placeholder='Email Address' className="py-3 md:py-4 px-2 w-4/6 text-black" onChange={event => setEmail(event.target.value)} />
                    <button type='submit' className="md:text-xl w-2/6 py-2 px-3 md:py-4 md:px-6 bg-[#e50914] border-[#e50914] cursor-pointer" onClick={() => router.push({ pathname: '/register', query: { email: email }})}>Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;