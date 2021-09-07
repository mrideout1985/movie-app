import api from "../api/index"
import Image from "next/image"
import Circle from "../../components/icons/Circle"
import styles from "../../styles/MoviePage.module.scss"

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

	const handleTrailer = (movie) => {
		return movie.videos?.results.find((video) => video.type === "Trailer")?.key

	}

	if (movie) {
		return (
			<section className={styles.container} style={{
				backgroundImage: `
			url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`
			}}>

				<div className={styles.card}>
					<div className={styles.image}>
						<Image src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="image" width={450} height={700} />
					</div>

					<div className={styles.information}>
						<div><h2>{movie.title}</h2>
							<h3>&#34;{movie.tagline}&#34;</h3>
							<div className={styles.additionalinfo}>
								{movie.vote_average ? <Circle rating={movie.vote_average} height={"2rem"} color="#80ED99" /> : null}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{movie.release_date ? movie.release_date.substring(0, 4) : null}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{movie.genres.map(genre => genre.name).join(", ")}
							</div>
							<p>{movie.overview}</p>
						</div>
						<div className={styles.trailer}>
							<iframe
								id="ytplayer"
								width="640"
								height="360"
								src={`https://www.youtube.com/embed/${handleTrailer(movie)}?autoplay=0`}
								frameBorder="0"
							></iframe>
						</div>
					</div>
				</div>

			</section >
		)
	} else {
		return null
	}

}

export default MovieDetails
