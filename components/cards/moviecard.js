import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Card.module.scss";
import Circle from "../icons/Circle";
import { useRouter } from "next/router";
import placeholder from "../../public/placeholder.png";
import LoveButton from "../loveButton/loveButton";

const MovieCard = ({ id, title, release_date, vote_average, poster_path }) => {
    const router = useRouter();

    const short_title = (title) => {
        return title?.length > 20 ? title.substring(0, 15) + "..." : title;
    };

    const known = (known_for) => {
        if (known_for) {
            return known_for.map((media, i) => {
                if (media) {
                    return (
                        // eslint-disable-next-line @next/next/link-passhref
                        <li key={i}>
                            <Link href={`/movie/${media.id}`}>
                                <div>
                                    {media.title && media.title?.length > 0
                                        ? media.title
                                        : null}
                                </div>
                            </Link>
                        </li>
                    );
                } else {
                    return null;
                }
            });
        } else {
            return null;
        }
    };

    return (
        <article className={styles.container}>
            <Link href={`/movie/${id}`}>
                <a>
                    <div className={styles.title}>
                        <h3>{short_title(title)}</h3>
                        <LoveButton name={title} />
                    </div>
                    {!poster_path ? (
                        <Image
                            className={styles.image}
                            src={placeholder}
                            alt="movie-image-not-found"
                            height={400}
                            width={260}
                        />
                    ) : (
                        <Image
                            className={styles.image}
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                            height={400}
                            width={260}
                            alt="movie poster"
                        />
                    )}
                    <div className={styles.info}>
                        <div className={styles.rating}>
                            {vote_average ? (
                                <Circle
                                    rating={vote_average}
                                    height={"2rem"}
                                    color="#80ED99"
                                />
                            ) : (
                                <Circle
                                    rating={"?"}
                                    height={"2rem"}
                                    color="#80ED99"
                                />
                            )}
                        </div>
                        <div
                            className={`${
                                vote_average ? styles.general : styles.wide
                            }`}
                        >
                            {release_date ? release_date.substring(0, 4) : null}
                        </div>
                    </div>
                </a>
            </Link>
        </article>
    );
};

export default MovieCard;
