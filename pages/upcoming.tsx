import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Requests from "../utils/Requests";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from 'firebase/firestore';
import Movie from "../components/Movie";
import Image from "next/image";

const Upcoming: React.FC = () => {
    const [movies, setMovies] = useState<any>();
    const [savedMovies, setSavedMovies] = useState<any[]>();
    const [like, setLike] = useState<boolean>(false);

    const { user } = useAuthContext();

    useEffect(() => {
        axios
            .get(Requests.fetchUpcomingMovies.url)
            .then(response => setMovies(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (user)
        {
            const ref = doc(db, 'users', `${user?.email}`);
            onSnapshot(ref, doc => setSavedMovies(doc.data()?.savedMovies));
        }
    }, [user]);

    console.log(movies ? movies.results : null)

    return (
        <div className="h-full w-full">
            <div 
              className="w-full h-[70px] md:h-[320px] lg:h-[500px] 2xl:h-[680px] bg-cover bg-center"
              style={{backgroundImage: "url('https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg')"}}  
            />
            <div className="absolute top-0 left-0 w-full h-[70px] md:h-[320px] lg:h-[500px] 2xl:h-[680px] bg-black/50">
                <div className="hidden md:block absolute bottom-[20%] ml-5 lg:ml-10 xl:ml-16 2xl:ml-24">
                    <p className="text-4xl lg:text-5xl 2xl:text-6xl font-semibold">Upcoming Movies</p>
                </div>
            </div>
            <div className="p-4 mx-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {movies && movies.results.map((movie:any, index:number) => (
                        <div key={index} className="cursor-pointer relative rounded">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                            alt={movie?.title}
                            width={2560}
                            height={1440}
                            className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-black/70 px-2 rounded">
                            <p className="text-gray-300 break-words">{movie?.title}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Upcoming;