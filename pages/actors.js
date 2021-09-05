import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import api from "./api/index"
import Meta from '../components/meta/meta'
import Card from '../components/card/card'


export default function Actors(props) {

	const actors = props.actors.results

	console.log(actors)

	return (
		<div className={styles.container}>
			<Meta title={"Actors"}>
				<meta name="description" content="Popular Actors" />
			</Meta>
			<h2>Popular Actors</h2>
			<div className={styles.popular}>
				{actors.map((actor, i) => {
					return (
						<Card key={i} id={actor.id} poster_path={actor.profile_path} title={actor.name} known_for={actor.known_for} />
					)

				})}
			</div>


		</div>
	)
}


export const getStaticProps = async () => {
	const popularActors = await api.popularActors()

	return {
		props: {
			actors: popularActors,
		}
	}
};