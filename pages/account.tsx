import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const Account: React.FC = () => {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!user)
            router.push('/')
    }, [user]);

    return (
        <div className="h-full w-full">
            <div 
              className="w-full h-[500px] bg-cover bg-center"
              style={{backgroundImage: "url('https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg')"}}  
            />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-black/50" />
            Account
        </div>
    );
}

export default Account;