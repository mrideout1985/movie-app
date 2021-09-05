import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import api from "./api/index"
import Meta from '../components/meta/meta'


export default function Home(props) {
	return (
		<div className={styles.container}>

			<Meta title={"TV SHOWS"}>
				<meta name="description" content="TV Shows on RMDB" />
			</Meta>

			TV SHOWS GO HERE LOL

		</div>
	)
}

export const getStaticProps = async () => {
	const popularMovieData = await api.popularMovies()
	const popularTvData = await api.popularTv()
	const nowPlayingMovies = await api.nowPlayingMovies()

	return {
		props: {
			popMovieData: popularMovieData,
			popTVData: popularTvData,
			nowPlayingMovies: nowPlayingMovies
		}
	}
};