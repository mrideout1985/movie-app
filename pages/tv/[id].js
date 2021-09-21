import api from "../api/index"
import Image from "next/image"
import { useMedia } from 'react-use';
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

	const phone = useMedia('(max-width: 600px)');
	const tab_port = useMedia('(max-width: 815px)');
	const tab_land = useMedia('(max-width: 1140px)');
	const large = useMedia('(max-width: 1800px)');


	const handleTrailer = (tv) => {
		return tv.videos?.results.find((video) => video.type === "Trailer")?.key

	}

	if (tv) {
		return (

			<div className={styles.container}>
				<div className={styles.card} style={{
					backgroundImage: `
			url(https://image.tmdb.org/t/p/original${tv?.backdrop_path})`
				}}>
					<div className={styles.mediaInfo}   >
						<div className={styles.image}>
							<Image
								src={`https://image.tmdb.org/t/p/original${tv?.poster_path}`} layout="fixed" alt="image" width={phone ? 240 : 0
									|| tab_port ? 300 : 0
										|| tab_land ? 350 : 0
											|| large ? 450 : 450} height={phone ? 380 : 0
												|| tab_port ? 480 : 0
													|| tab_land ? 520 : 0
														|| large ? 650 : 650} />
						</div>
						<div className={styles.generalInfo}>
							<div className={styles.title}>
								<h1>{tv.name}</h1>
								<div className={styles.tagline}>{tv.tagline}</div>
								<div className={styles.rating}>
									{tv.vote_average ? <h3>{tv.vote_average}</h3> : null}&nbsp;&nbsp;-&nbsp;&nbsp;{tv.release_date ? <div className={styles.release_date}>{tv.release_date.substring(0, 4)}</div> : null}&nbsp;&nbsp;-&nbsp;&nbsp;<div className={styles.genres}>{tv.genres.map(genre => genre.name).join(", ")}</div>
								</div>
								<div className={styles.overview}>
									{tv.overview}
								</div>
							</div>
							<div className={styles.trailer}>
								<iframe
									id="ytplayer"
									src={`https://www.youtube.com/embed/${handleTrailer(tv)}?autoplay=0`}
									frameBorder="0"

								></iframe>
							</div>
						</div>

					</div>
					<div className={styles.cast}>
					</div>
				</div>
			</div>)
	} else {
		return null
	}


}

export default TvDetails
