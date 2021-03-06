import api from "../api/index";
import Image from "next/image";
import styles from "../../styles/MediaPage.module.scss";
import { useMedia } from "react-use";
import ActorCard from "../../components/cards/actorcard";
import { Heart } from "@/components/icons";

export const getStaticProps = async ({ params }) => {
    const movie = await api.movie(params.id);
    return {
        props: { movie },
    };
};

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

export default function MovieDetails(props) {
    const phone = useMedia("(max-width: 600px)");
    const tab_port = useMedia("(max-width: 815px)");
    const tab_land = useMedia("(max-width: 1140px)");
    const large = useMedia("(max-width: 1800px)");

    const movie = props.movie;

    const handleTrailer = (movie) => {
        return movie.videos?.results.find((video) => video.type === "Trailer")
            ?.key;
    };

    if (movie) {
        return (
            <div className={styles.container}>
                <div
                    className={styles.card}
                    style={{
                        backgroundImage: `
			url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
                    }}
                >
                    <div className={styles.mediaInfo}>
                        <div className={styles.image}>
                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                                layout="fixed"
                                alt="image"
                                width={
                                    phone
                                        ? 240
                                        : 0 || tab_port
                                        ? 300
                                        : 0 || tab_land
                                        ? 350
                                        : 0 || large
                                        ? 450
                                        : 450
                                }
                                height={
                                    phone
                                        ? 380
                                        : 0 || tab_port
                                        ? 480
                                        : 0 || tab_land
                                        ? 520
                                        : 0 || large
                                        ? 650
                                        : 650
                                }
                            />
                        </div>
                        <div className={styles.generalInfo}>
                            <div className={styles.title}>
                                <h1>{movie.title}</h1>
                                <div className={styles.tagline}>
                                    {movie.tagline}
                                </div>
                                <div className={styles.rating}>
                                    {movie.vote_average ? (
                                        <h3>{movie.vote_average}</h3>
                                    ) : null}
                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                    {movie.release_date ? (
                                        <div className={styles.release_date}>
                                            {movie.release_date.substring(0, 4)}
                                        </div>
                                    ) : null}
                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                    <div className={styles.genres}>
                                        {movie.genres
                                            .map((genre) => genre.name)
                                            .join(", ")}
                                    </div>
                                </div>
                                <div className={styles.overview}>
                                    {movie.overview}
                                </div>
                            </div>
                            <div className={styles.trailer}>
                                <iframe
                                    id="ytplayer"
                                    src={`https://www.youtube.com/embed/${handleTrailer(
                                        movie
                                    )}?autoplay=0`}
                                    frameBorder="0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={styles.cast}>
                    <h2>Cast</h2>
                    <div className={styles.castlist}>
                        {movie.credits.cast
                            .slice(0, 10)
                            .map((actor, i) =>
                                actor.profile_path ? (
                                    <ActorCard
                                        key={i}
                                        id={actor.id}
                                        name={actor.name}
                                        profile_path={actor.profile_path}
                                        imageHeight={280}
                                        imageWidth={200}
                                    />
                                ) : null
                            )}
                    </div>
                </section>
            </div>
        );
    } else {
        return null;
    }
}
