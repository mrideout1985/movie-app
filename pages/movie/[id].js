import api from "../api/index"
import Image from "next/image"
import styles from "../../styles/Movie.module.scss"

export const getStaticProps = async ({ params }) => {
	const movie = await api.movie(params.id)
	return {
		props: { movie }
	}
}

export const getStaticPaths = async () => {
	const popularMovies = await api.popularMovies()
	const paths = popularMovies.results.map((movie) => ({ params: { id: movie.id } }))
	return {
		paths: [],
		fallback: true,
	}
}

const MovieDetails = (props) => {

	const movie = props.movie
	console.log("movie", movie)

	return (
		<div className={styles.moviecard}>

		</div >
	)
}

export default MovieDetails
