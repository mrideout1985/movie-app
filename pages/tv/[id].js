import api from "../api/index"
import Image from "next/image"
import styles from "../../styles/Movie.module.scss"

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

	return (
		<div className={styles.moviecard}>
			<p>{tv.original_name}</p>
		</div >
	)
}

export default TvDetails
