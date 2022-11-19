import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import GoogleButton from 'react-google-button';
import { useAuthContext } from "../context/AuthContext";

const SignIn: React.FC = () => {
    const { user, googleSignIn } = useAuthContext();

    const router = useRouter();

    const handleGoogleSignIn = () => {
        try {
            googleSignIn();
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
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    )
}

export default SignIn;