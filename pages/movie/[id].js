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
			<div className={styles.info} >
				<div className={styles.header} >
					<img className={styles.poster} src={
						movie.poster_path !== null
							? `https://image.tmdb.org/t/p/original${movie?.poster_path}`
							: `https://place-hold.it/300x500/aaa/WHITE&text=NO-IMAGE-AVAILABLE&fontsize=20`
					} alt="movie-poster" />
					<h1>{movie?.title}</h1>
					<h4>{movie?.release_date}</h4>
					<span className={styles.minutes} >{movie.runtime} mins</span >
					<p className={styles.genre} >{movie.genres.map(el => el.name).join(", ")}</p >
				</div >
				<div className={styles.overview} >
					<p className={styles.text} >
						{movie.overview}
					</p >
				</div >
				<div className={styles.socialmedia} >
					<ul>
						<li><i className={styles.socialmedia}>share</i></li>
						<li><i className={styles.socialmedia}></i></li >
						<li><i className={styles.socialmedia}>chat_bubble</i></li >
					</ul >
				</div >
			</div >
			<div className={styles.blurbackground}></div >
		</div >
	)
}

export default MovieDetails
