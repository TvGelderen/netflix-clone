import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Requests from "../utils/Requests";
import MovieCarousel from "./MovieCarousel";
import { db } from "../firebase";
import { doc, onSnapshot } from 'firebase/firestore';

const Movies: React.FC = () => {
    const [savedMovies, setSavedMovies] = useState<any[]>();

    const { user } = useAuthContext();

    useEffect(() => {
        if (user)
        {
            const ref = doc(db, 'users', `${user?.email}`);
            onSnapshot(ref, doc => setSavedMovies(doc.data()?.savedMovies));
        }
    }, [user]);

    return (
        <>
            <MovieCarousel {...Requests.fetchTrendingMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchTopRatedMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchActionMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchAdventureMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchAnimationMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchComedyMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchDramaMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchHistoryMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchHorrorMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchRomanceMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchScienceFictionMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchThrillerMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchWarMovies} savedMovies={savedMovies} />
            <MovieCarousel {...Requests.fetchWesternMovies} savedMovies={savedMovies} />
        </>
    )
}

export default Movies;