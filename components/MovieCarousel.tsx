import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Movie from "./Movie";
import Requests, { getCast } from "../utils/Requests";

type props = {
    title: string;
    url: string;
    savedMovies: any[] | undefined
}

const MovieCarousel: React.FC<props> = ({ title, url, savedMovies }: props) => {
    const [movies, setMovies] = useState<any[]>();
    const [genres, setGenres] = useState<any[]>();
    const [modal, setModal] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<any>();
    const [selectedMovieGenres, setSelectedMovieGenres] = useState<any[]>();
    const [selectedMovieCast, setSelectedMovieCast] = useState<any[]>();
    const [trailerKey, setTrailerKey] = useState<string>();

    const API_HOST = process.env.NEXT_PUBLIC_MOVIEDB_HOST;
    const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;
    
    const scrollLeft = () => {
        let slider = document.getElementById(`${title}-slider`);
        
        if (slider !== null)
        slider.scrollLeft = slider.scrollLeft - 800;
    };
    
    const scrollRight = () => {
        let slider = document.getElementById(`${title}-slider`);
        
        if (slider !== null)
        slider.scrollLeft = slider.scrollLeft + 800;
    };
    
    useEffect(() => {
        axios
          .get(url)
          .then(response => setMovies(response.data.results))
          .catch(error => console.error(error));

        axios.get(Requests.fetchMovieGenres.url)
          .then(response => setGenres(response.data.genres))
          .catch(error => console.error(error));
    }, [url]);

    useEffect(() => {
        const url = `${API_HOST}/movie/${selectedMovie?.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`;

        if (selectedMovie?.id !== undefined)
        {
            axios
              .get(url)
              .then(response => setTrailerKey(response.data.videos.results.find((video:any) => video.name.toLowerCase().includes("trailer")).key))
              .catch(error => console.error(error));

            axios
              .get(getCast(selectedMovie.id))
              .then(response => setSelectedMovieCast(response.data.cast))
              .catch(error => console.error(error));
        }

        setSelectedMovieGenres(genres?.filter(genre => selectedMovie?.genre_ids?.includes(genre.id)));
    }, [selectedMovie, genres]);

    return (
        <div className="mb-6">
            <h2 className="relative font-semibold text-xl md:text-2xl pl-6 md:pl-10 lg:pl-14 pb-2 text-gray-300">{title}</h2>
            <div className="relative flex items-center group">
                <div id={`${title}-slider`} className="relative w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide px-4 md:px-8 lg:px-12">
                    {movies?.map((movie, index) => (
                        <span key={index} onClick={() => {
                            setSelectedMovie(movie);
                            setModal(true);
                        }}>
                            <Movie movie={movie} savedMovies={savedMovies} />
                        </span>
                    ))}
                </div>

                <div className="absolute z-2 left-2 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block" onClick={scrollLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 lg:w-12 lg:h-12">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="absolute z-2 right-2 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block" onClick={scrollRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 lg:w-12 lg:h-12">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {modal && 
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <div className="z-10 fixed top-0 left-0 right-0 bottom-0 bg-black/70" />
                    <div className="z-10 fixed w-[100%] h-[70%] max-h-[650px] md:w-[90%] md:h-[92vw] max-w-[1080px] md:max-h-[950px] bg-[#101010] rounded-lg">
                        <div className="absolute top-3 right-3 cursor-pointer p-2 bg-[#101010]/90 rounded-full" onClick={() => setModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <iframe 
                          src={`https://www.youtube.com/embed/${trailerKey}`} 
                          title="Trailer" 
                          allowFullScreen
                          className="w-full h-[50vw] max-h-[610px] rounded-t-xl"
                        />
                        <div className="p-4 text-sm md:text-base w-full sm:w-[75%] lg:w-[60%]">
                            <p className="text-xs md:text-sm text-gray-300">
                                Released: {selectedMovie?.release_date}
                            </p>
                            <p className="mt-5">
                                {selectedMovie?.overview}
                            </p>
                            <p className="mt-3">
                                <span className="text-gray-500">Genres: </span>
                                {selectedMovieGenres?.map((genre, index) => (
                                    <span key={index}>
                                        {genre.name}{index !== selectedMovieGenres.length - 1 && <span>, </span>}
                                    </span>))}
                            </p>
                            <p className="mt-3">
                                <span className="text-gray-500">Cast: </span>
                                {selectedMovieCast?.slice(0, 4).map((actor, index) => 
                                    <span key={index}>
                                        {actor.name}{index < 3 && <span>, </span>}
                                    </span>)}
                            </p>
                            <p className="mt-3">
                                <span className="text-gray-500">Original language: </span>
                                {selectedMovie.original_language}
                            </p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default MovieCarousel;
