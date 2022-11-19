import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type props = {
    title: string;
    url: string;
}

const MovieCarousel: React.FC<props> = ({ title, url }: props) => {
    const [like, setLike] = useState<boolean>(false);
    const [movies, setMovies] = useState<any[]>();

    useEffect(() => {
        axios
          .get(url)
          .then(response => setMovies(response.data.results))
          .catch(error => console.error(error));
    }, [url]);

    const scrollLeft = () => {
        let slider = document.getElementById(`${title}-slider`);
        
        if (slider !== null)
            slider.scrollLeft = slider.scrollLeft - 500;
    };

    const scrollRight = () => {
        let slider = document.getElementById(`${title}-slider`);
        
        if (slider !== null)
            slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <div className="mb-6">
            <h2 className="relative font-semibold text-xl md:text-2xl px-4 pb-2">{title}</h2>
            <div className="relative flex items-center group">
                <div id={`${title}-slider`} className="relative w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide px-12">
                    {movies?.map((movie, index) => (
                        <div key={index} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[320px] inline-block cursor-pointer relative mx-2 rounded">
                            <Image
                              src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                              alt={movie?.title}
                              width={2560}
                              height={1440}
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-black/70 px-2 rounded">
                                <div className="absolute top-1 left-3">
                                    {like 
                                      ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                      : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>}
                                </div>
                                <p className="text-gray-300 break-words">{movie?.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute z-[2] left-2 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block" onClick={scrollLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 lg:w-12 lg:h-12">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="absolute z-[2] right-2 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block" onClick={scrollRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 lg:w-12 lg:h-12">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className="absolute right-0 top-0 w-1/12 h-full bg-gradient-to-l from-black" />
                <div className="absolute left-0 top-0 w-1/12 h-full bg-gradient-to-r from-black" />
            </div>
        </div>
    )
}

export default MovieCarousel;