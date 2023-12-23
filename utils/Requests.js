const API_HOST = process.env.NEXT_PUBLIC_MOVIEDB_HOST;
const API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY;

export const getCast = movieId => `${API_HOST}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`

export default {
    fetchMovieGenres: {
        title: 'Genres',
        url: `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    },
    fetchTrendingMovies: {
        title: 'Trending',
        url: `${API_HOST}/trending/movie/week?api_key=${API_KEY}`
    },
    fetchTopRatedMovies: {
        title: 'Top Rated',
        url: `${API_HOST}/movie/top_rated?api_key=${API_KEY}&language=en-US&`
    },
    fetchLatestMovies: {
        title: 'Latest',
        url: `${API_HOST}/movie/latest?api_key=${API_KEY}&language=en-US&`
    },
    fetchPopularMovies: {
        title: 'Popular',
        url: `${API_HOST}/movie/popular?api_key=${API_KEY}&language=en-US&`
    },
    fetchUpcomingMovies: {
        title: 'Upcoming',
        url: `${API_HOST}/movie/upcoming?api_key=${API_KEY}&language=en-US&`
    },
    fetchActionMovies: {
        title: 'Action',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28`
    },
    fetchAdventureMovies: {
        title: 'Adventure',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=12`
    },
    fetchAnimationMovies: {
        title: 'Animation',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16`
    },
    fetchComedyMovies: {
        title: 'Comedy',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35`
    },
    fetchDocumentaryMovies: {
        title: 'Documentary',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=99`
    },
    fetchDramaMovies: {
        title: 'Drama',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18`
    },
    fetchHistoryMovies: {
        title: 'History',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=36`
    },
    fetchHorrorMovies: {
        title: 'Horror',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=27`
    },
    fetchMysteryMovies: {
        title: 'Mystery',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=9648`
    },
    fetchRomanceMovies: {
        title: 'Romance',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10749`
    },
    fetchScienceFictionMovies: {
        title: 'Science Fiction',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=878`
    },
    fetchThrillerMovies: {
        title: 'Thriller',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=53`
    },
    fetchWarMovies: {
        title: 'War',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10752`
    },
    fetchWesternMovies: {
        title: 'Western',
        url: `${API_HOST}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=37`
    }
}
