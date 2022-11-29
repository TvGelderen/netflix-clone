import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc  } from 'firebase/firestore';
import Image from "next/image";

const Lists: React.FC = () => {
    const [savedMovies, setSavedMovies] = useState<any[]>();
    const { user } = useAuthContext();
    const router = useRouter();
    
    useEffect(() => {
        if (user)
        {
            const ref = doc(db, 'users', `${user?.email}`);
            onSnapshot(ref, doc => setSavedMovies(doc.data()?.savedMovies));
        }
        else
            router.push('/')
    }, [user]);

    const handleDelete = (id:number) => {
        const ref = doc(db, 'users', `${user?.email}`);

        const newArray = savedMovies?.filter((item: { id: number }) => item.id !== id)

        updateDoc(ref, {
            savedMovies: newArray,
        });
    };

    return (
        <div className="min-h-screen w-full">
            <div 
              className="w-full h-[70px] md:h-[320px] lg:h-[500px] 2xl:h-[680px] bg-cover bg-center"
              style={{backgroundImage: "url('https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg')"}}  
            />
            <div className="absolute top-0 left-0 w-full h-[70px] md:h-[320px] lg:h-[500px] 2xl:h-[680px] bg-black/50">
                <div className="hidden md:block absolute bottom-[20%] ml-5 lg:ml-10 xl:ml-16 2xl:ml-24">
                    <p className="text-4xl lg:text-5xl 2xl:text-6xl font-semibold">My Lists</p>
                </div>
            </div>
            <div className="p-4 mx-4">
                <h1 className="text-2xl lg:text-3xl font-semibold pb-2">Saved Movies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {savedMovies?.map((movie, index) => (
                        <div key={index} className="cursor-pointer relative rounded">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                                alt={movie?.title}
                                width={2560}
                                height={1440}
                                className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-black/70 px-2 rounded">
                                <div className="absolute top-1 right-3" onClick={() => handleDelete(movie.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-300 break-words">{movie?.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Lists;