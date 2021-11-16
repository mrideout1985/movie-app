const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

const api = {
    popularMovies: async () => {
        const res = await fetch(
            `${BASE_URL}movie/popular?api_key=${API_KEY}&page=1`
        );
        return await res.json();
    },
    nowPlayingMovies: async () => {
        const res = await fetch(
            `${BASE_URL}movie/now_playing?api_key=${API_KEY}&page=1`
        );
        return await res.json();
    },
    movie: async (id) => {
        const res = await fetch(
            `${BASE_URL}movie/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images,credits,genres`
        );
        return await res.json();
    },
    popularTv: async () => {
        const res = await fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}`);
        return await res.json();
    },
    topRatedTv: async () => {
        const res = await fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}`);
        return await res.json();
    },
    tv: async (id) => {
        const res = await fetch(
            `${BASE_URL}tv/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images,credits,genres`
        );
        return await res.json();
    },
    popularActors: async () => {
        const res = await fetch(
            `${BASE_URL}person/popular?api_key=${API_KEY}&page=1`
        );
        return await res.json();
    },
    actor: async (id) => {
        const res = await fetch(
            `${BASE_URL}person/${id}?api_key=${API_KEY}&page=1&append_to_response=combined_credits,external_ids`
        );
        return await res.json();
    },
    search: async (searchQuery) => {
        const res = await fetch(
            `${BASE_URL}search/multi?api_key=${API_KEY}&include_adult=true&query=${searchQuery}`
        );
        return await res.json();
    },
};

export default api;
