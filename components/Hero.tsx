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
        <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[650px] 2xl:h-[900px] mb-[-50px]">
            <div className="absolute w-full h-[400px] sm:h-[450px] lg:h-[650px] 2xl:h-[900px] bg-gradient-to-r from-black" />
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
              width={2560}
              height={1440}
              className="w-full h-full object-cover bg-gradient-to-t from-black"
            />
            <div className="absolute w-full top-[15%] lg:top-[25%] p-4 md:p-10 2xl:ml-[100px]">
                <h1 className="text-4xl lg:text-5xl font-semibold">{movie?.title}</h1>
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
                <p className="text-gray-300 text-md pb-2">Released: {movie?.release_date}</p>
                <p className="w-full sm:max-w-[60%] lg:max-w-[45%] xl:max-w-[35%] 2xl:max-w-[20%] text-gray-100">{movie?.overview.length > 250 
                  ? movie?.overview.substring(0, 250) + "..."
                  : movie?.overview}</p>
            </div>

            <div className="absolute top-[95%] left-0 right-0 bottom-0 bg-gradient-to-t from-black" />
        </div>
    )
}

export default Hero;