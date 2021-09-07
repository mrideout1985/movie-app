import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import api from "./api/index"
import Meta from '../components/meta/meta'
import TvCard from '../components/cards/tvcard'
// import Card from '../components/card/card'


export default function Tvshows(props) {

	const tvData = (props.popTVData)

	return (
		<div className={styles.container}>
			<Meta title={"TV SHOWS"}>
				<meta name="description" content="TV Shows" />
			</Meta>
			<h2>Popular TV</h2>
			<div className={styles.popular}>
				{tvData.results.map((tv, i) => {
					return (
						<TvCard key={i} id={tv.id} first_air_date={tv.first_air_date} name={tv.name} poster_path={tv.poster_path} vote_average={tv.vote_average} />
					)
				})}
			</div>


		</div>
	)
}


export const getStaticProps = async () => {
	const popularTvData = await api.popularTv()

	return {
		props: {
			popTVData: popularTvData,
		}
	}
};