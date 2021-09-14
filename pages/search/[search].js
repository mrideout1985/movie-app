import React from 'react'
import { useRouter } from "next/router";
// import axios from "axios"
import api from "../api/index"
import MovieCard from "../../components/cards/moviecard"
import TvCard from "../../components/cards/tvcard"
import ActorCard from "../../components/cards/actorcard"
import styles from "../../styles/ResultsPage.module.scss"

// const fetchData = async (query) => await axios.get(api.search(query)).then((res) => {
// 	data: res.data
// }).catch(() => {
// 	error: true
// })


export const getStaticProps = async ({ params }) => {
	const data = await api.search(params.search)
	return {
		props: { data }
	};
}

export const getStaticPaths = async () => {
	const data = await api.search()
	const paths = data.results.map((movie) => ({ params: { id: movie.id } }))

	return {
		paths: [],
		fallback: true,

	}
}
const Search = (props) => {
	let data = props.data?.results
	console.log(data)
	return (
		<div className={styles.container}>
			<header>
				<h2>Results</h2>
			</header>

			<div className={styles.results}>

				{data?.map((media, i) => {
					if (media.media_type === "movie" && media.poster_path) {
						return <MovieCard title={media.title} id={media.id} release_date={media.release_date} vote_average={media.vote_average} poster_path={media.poster_path} />
					}
					if (media.media_type === "tv" && media.poster_path) {
						return <TvCard key={i} id={media.id} first_air_date={media.first_air_date} name={media.name} poster_path={media.poster_path} vote_average={media.vote_average} />

					}
					if (media.media_type === "person" && media.profile_path) {
						return <ActorCard key={i} id={media.id} name={media.name} profile_path={media.profile_path} known_for={media.known_for} />
					}



				})}
			</div>


		</div>
	)
}

export default Search

