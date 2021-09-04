const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";


const api = {
	popularMovies: () => {
		return fetch(
			`${BASE_URL}movie/popular?api_key=${API_KEY}&page=1`
		).then((res) => res.json());
	},
	nowPlayingMovies: () => {
		return fetch(
			`${BASE_URL}movie/now_playing?api_key=${API_KEY}&page=1`
		).then((res) => res.json());
	},
	movie: (id) => {
		return fetch(
			`${BASE_URL}movie/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images,credits,genres`
		).then((res) => res.json());
	},
	popularTv: () => {
		return fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}`).then((res) =>
			res.json()
		);
	},
	topRatedTv: () => {
		return fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}`).then((res) =>
			res.json()
		);
	},
	tv: (id) => {
		return fetch(
			`${BASE_URL}tv/${id}?api_key=${API_KEY}&page=1&append_to_response=videos,images,credits,genres`
		).then((res) => res.json());
	},
	popularActors: () => {
		return fetch(
			`${BASE_URL}person/popular?api_key=${API_KEY}&page=1`
		).then((res) => res.json());
	},
	actor: (id) => {
		return fetch(
			`${BASE_URL}person/${id}?api_key=${API_KEY}&page=1&append_to_response=combined_credits,external_ids`
		).then((res) => res.json());
	},
	search: (searchQuery) => {
		return fetch(
			`${BASE_URL}search/multi?api_key=${API_KEY}&include_adult=true&query=${searchQuery}`
		).then((res) => res.json());
	},
};



export default api;

