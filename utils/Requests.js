const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getCast = movieId => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`

export default {
    fetchMovieGenres: {
        title: 'Genres',
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    },
    fetchTrendingMovies: {
        title: 'Trending',
        url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    },
    fetchTopRatedMovies: {
        title: 'Top Rated',
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&`
    },
    fetchLatestMovies: {
        title: 'Latest',
        url: `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US&`
    },
    fetchPopularMovies: {
        title: 'Popular',
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&`
    },
    fetchUpcomingMovies: {
        title: 'Upcoming',
        url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&`
    },
    fetchActionMovies: {
        title: 'Action',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28`
    },
    fetchAdventureMovies: {
        title: 'Adventure',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=12`
    },
    fetchAnimationMovies: {
        title: 'Animation',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16`
    },
    fetchComedyMovies: {
        title: 'Comedy',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35`
    },
    fetchDocumentaryMovies: {
        title: 'Documentary',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=99`
    },
    fetchDramaMovies: {
        title: 'Drama',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18`
    },
    fetchHistoryMovies: {
        title: 'History',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=36`
    },
    fetchHorrorMovies: {
        title: 'Horror',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=27`
    },
    fetchMysteryMovies: {
        title: 'Mystery',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=9648`
    },
    fetchRomanceMovies: {
        title: 'Romance',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10749`
    },
    fetchScienceFictionMovies: {
        title: 'Science Fiction',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=878`
    },
    fetchThrillerMovies: {
        title: 'Thriller',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=53`
    },
    fetchWarMovies: {
        title: 'War',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10752`
    },
    fetchWesternMovies: {
        title: 'Western',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=37`
    }
}