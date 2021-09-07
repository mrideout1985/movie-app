import api from "../api/index"
import Image from "next/image"
import styles from "../../styles/Movie.module.scss"

export const getStaticProps = async ({ params }) => {
	const actor = await api.actor(params.id)
	return {
		props: { actor }
	}
}

export const getStaticPaths = async () => {
	const popularActors = await api.popularActors()
	const paths = popularActors.results.map((actor) => ({ params: { id: actor.id } }))
	return {
		paths: [],
		fallback: true,
	}
}

const ActorDetails = (props) => {

	const actor = props.actor

	return (
		<div className={styles.moviecard}>
			<p>{actor?.name}</p>
		</div >
	)
}

export default ActorDetails
