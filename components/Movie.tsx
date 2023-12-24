import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, doc, onSnapshot, addDoc, deleteDoc, query, where } from "firebase/firestore";
import Image from "next/image";
import { useEffect } from "react";

const Movie: React.FC<any> = ({ movie, savedMovies }: { movie: any, savedMovies: any[] }) => {
    const [saved, setSaved] = useState<boolean>(false);
    const { user } = useAuthContext();

    const saveMovie = async () => {
        if (user && savedMovies !== undefined)
        {
            setSaved(!saved);

            const userRef = doc(db, "customers", user.uid);
            const savedMoviesRef = collection(userRef, "savedMovies");

            if (savedMovies?.find((item: { id: number; }) => item.id === movie.id))
            {
                const movieQuery = query(savedMoviesRef, where("id", "==", movie.id));

                const unsubscribe = onSnapshot(movieQuery, snapshot => {
                    snapshot.forEach(document => {
                        deleteDoc(document.ref);
                    });
                });

                return () => unsubscribe();
            }
            else {
                await addDoc(savedMoviesRef, {
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path
                });
            }
        }
        else {
            alert('Please log in to save a movie.');
        }
    }

    useEffect(() => {
        if (savedMovies !== undefined && savedMovies?.find((item: { id: number; }) => item?.id === movie.id)) {
            setSaved(true);
        }
    }, [savedMovies, movie.id]);

    return (
        <div className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[340px] inline-block cursor-pointer relative mx-2 rounded">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
              alt={movie?.title}
              width={500}
              height={280}
              className="rounded"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-black/70 px-2 rounded text-center">
                <div 
                    className="absolute top-1 left-3" 
                    onClick={event => {
                        event.stopPropagation();
                        saveMovie();
                    }}
                >
                    {saved 
                        ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                          </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>}
                </div>
                <p className="text-gray-300 whitespace-break-spaces">{movie?.title}</p>
            </div>
        </div>
    );
}

export default Movie;
