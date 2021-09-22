import React from 'react'
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/Card.module.scss"
import Circle from '../icons/Circle'
import { useRouter } from 'next/router'
import placeholder from "../../public/placeholder.png"


const ActorCard = ({ id, name, profile_path, known_for, imageHeight, imageWidth }) => {

	const router = useRouter()


	const short_title = (name) => {
		return name.length > 20 ? name.substring(0, 15) + "..." : name
	}



	const known = (known_for) => {
		if (known_for) {
			return known_for.map((media, i) => {
				if (media) {
					return (
						// eslint-disable-next-line @next/next/link-passhref
						<li key={i}><Link href={`/movie/${media.id}`}><div>{media.title?.length > 0 ? media.title + "." : ""}
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
			<Link href={`/actor/${id}`}>
				<a>
					<h3>{short_title(name)}</h3>
					{profile_path ? <Image className={styles.image} src={`https://image.tmdb.org/t/p/original${profile_path}`} height={imageHeight ? imageHeight : 420} width={imageWidth ? imageWidth : 280} alt="movie poster" />
						: <Image className={styles.image} src={placeholder} alt="movie-image-not-found" height={420} width={280} />}
					<div className={styles.info}>
						<div className={`${styles.knownfor}`}>
							<ul>
								{known(known_for)}
							</ul>
						</div>
					</div>
				</a>
			</Link>
		</article>
	)
}

export default ActorCard
