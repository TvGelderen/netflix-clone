import React, { useEffect, useState } from "react";

import axios from "axios";
import Requests from "../utils/Requests";
import Image from "next/image";

const Hero: React.FC = () => {
    const [movies, setMovies] = useState<any[]>();
    const movie = movies ? movies[Math.floor(Math.random() * movies.length)] : null;

    useEffect(() => {
        axios
          .get(Requests.fetchTrendingMovies.url)
          .then(response => setMovies(response.data.results))
          .catch(error => console.error(error));
    }, []);
    
    return (
        <div className="w-full h-[75vh]">
            <div className="absolute w-full h-[90vh] bg-gradient-to-t from-black" />
            <div className="absolute w-full h-[90vh] bg-gradient-to-r from-black" />
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
              width={1920}
              height={1080}
              className="w-full h-[90vh] object-cover object-center"
            />
            <div className="absolute w-full top-[40%] p-4 md:p-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{movie?.title}</h1>
                <p className="w-full pt-4 sm:max-w-[60%] lg:max-w-[45%] xl:max-w-[35%] 2xl:max-w-[20%] text-gray-100">{movie?.overview.length > 250 
                  ? movie?.overview.substring(0, 240) + "..."
                  : movie?.overview}</p>
                <div className="flex my-4">
                    <button className="flex bg-gray-300 px-3 py-1 lg:px-4 lg:py-2 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-5 h-5 lg:w-6 lg:h-6 mt-[2px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                        <p className="text-black lg:text-xl font-semibold">&nbsp;Play</p>
                    </button>
                    <button className="flex bg-gray-300/30 px-3 py-1 lg:px-4 lg:py-2 ml-4 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6 mt-[2px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p className="text-gray-300 lg:text-xl font-semibold">&nbsp;Watch Later</p>
                    </button>
                </div>
            </div>

            <div className="absolute top-[95%] left-0 right-0 bottom-0 bg-gradient-to-t from-black" />
        </div>
    )
}

export default Hero;
