import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Movie from "./Movie";

type props = {
    title: string;
    url: string;
    savedMovies: any[] | undefined
}

const MovieCarousel: React.FC<props> = ({ title, url, savedMovies }: props) => {
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
                        <Movie key={index} movie={movie} savedMovies={savedMovies} />
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