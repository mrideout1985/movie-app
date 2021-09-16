import api from "../api/index"
import Image from "next/image"
import Circle from "../../components/icons/Circle"
import styles from "../../styles/MediaPage.module.scss"
import { useMedia } from 'react-use';


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

	const phone = useMedia('(max-width: 600px)');
	const tab_port = useMedia('(max-width: 815px)');
	const tab_land = useMedia('(max-width: 1140px)');
	const large = useMedia('(max-width: 1800px)');







	const movie = props.movie

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
					<Image className={styles.image}
						src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} layout="fixed" alt="image" width={phone ? 240 : 0
							|| tab_port ? 300 : 0
								|| tab_land ? 350 : 0
									|| large ? 500 : 0} height={phone ? 380 : 0
										|| tab_port ? 480 : 0
											|| tab_land ? 520 : 0
												|| large ? 700 : 0} />

					<div className={styles.information}>
						<div><h2>{movie.title}</h2>
							{movie.tagline ? <h3>&#34;{movie.tagline}&#34;</h3> : null}
							<div className={styles.additionalinfo}>
								{movie.vote_average ? <Circle rating={movie.vote_average} height={"2rem"} color="#80ED99" /> : null}&nbsp;&nbsp;{movie.release_date ? <div className={styles.release_date}>{movie.release_date.substring(0, 4)}</div> : null}&nbsp;&nbsp;|&nbsp;&nbsp;<div className={styles.genres}>{movie.genres.map(genre => genre.name).join(", ")}</div>
							</div>
							<p>{movie.overview}</p>
						</div>
						<div className={styles.trailer}>
							<iframe
								id="ytplayer"
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
