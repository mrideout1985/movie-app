import React from 'react'
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/Card.module.scss"
import Circle from '../icons/Circle'
import { useRouter } from 'next/router'


const Card = ({ id, title, release_date, vote_average, poster_path, known_for }) => {

	const router = useRouter()


	const short_title = (title) => {
		return title.length > 20 ? title.substring(0, 15) + "..." : title
	}



	const known = (known_for) => {
		if (known_for) {
			return known_for.map((media, i) => {
				if (media) {
					return (
						// eslint-disable-next-line @next/next/link-passhref
						<li key={i}><Link href={`/movie/${media.id}`}><div>{media.title?.length > 0 ? media.title : null}
						</div></Link></li>
					)
				} else {
					return null
				}
			})
		} else {
			return null
		}

	}


	return (
		<article className={styles.container}>
			<Link href={`/movie/${id}`}>
				<a>
					<h3>{short_title(title)}</h3>
					<Image className={styles.image} src={`https://image.tmdb.org/t/p/original${poster_path}`} height={420} width={280} alt="movie poster" />
					<div className={styles.info}>

						<div className={`${vote_average ? styles.rating : styles.dissapear}`}>
							{vote_average ? <Circle rating={vote_average} height={"2rem"} color="#80ED99" /> : null}

						</div>
						<div className={`${vote_average ? styles.general : styles.wide}`}>
							{release_date ? release_date.substring(0, 4) : <ul>{known(known_for)}</ul>}
						</div>
					</div>
				</a>
			</Link>
		</article>
	)
}

export default Card
