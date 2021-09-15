import api from "../api/index"
import Image from "next/image"
import Circle from "../../components/icons/Circle"
import styles from "../../styles/MediaPage.module.scss"

export const getStaticProps = async ({ params }) => {
	const tv = await api.tv(params.id)
	return {
		props: { tv }
	}
}

export const getStaticPaths = async () => {
	const popularTv = await api.popularTv()
	const paths = popularTv.results.map((tv) => ({ params: { id: tv.id } }))
	return {
		paths: [],
		fallback: true,
	}
}

const TvDetails = (props) => {

	const tv = props.tv



	const handleTrailer = (tv) => {
		return tv.videos?.results.find((video) => video.type === "Trailer")?.key

	}

	if (tv) {
		return (
			<section className={styles.container} style={{
				backgroundImage: `
			url(https://image.tmdb.org/t/p/original${tv?.backdrop_path})`
			}}>

				<div className={styles.card}>
					<div className={styles.imagecontainer}>
						<Image className={styles.image} src={`https://image.tmdb.org/t/p/original${tv?.poster_path}`} alt="image" width={450} height={700} />
					</div>

					<div className={styles.information}>
						<div><h2>{tv.name}</h2>
							{tv.tagline ? <h3>&#34;{tv.tagline}&#34;</h3> : null}
							<div className={styles.additionalinfo}>
								{tv.vote_average ? <Circle rating={tv.vote_average} height={"2rem"} color="#80ED99" /> : null}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{tv.first_air_date ? tv.first_air_date.substring(0, 4) : null}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{tv.genres.map(genre => genre.name).join(", ")}
							</div>
							<p>{tv.overview}</p>
						</div>
						<div className={styles.trailer}>
							<iframe
								id="ytplayer"
								width="640"
								height="360"
								src={`https://www.youtube.com/embed/${handleTrailer(tv)}?autoplay=0`}
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

export default TvDetails
