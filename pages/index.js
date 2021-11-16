import Head from "next/head";
import styles from "../styles/Home.module.scss";
import api from "./api/index";
import Meta from "../components/meta/meta";
import MovieCard from "../components/cards/moviecard";

export default function Home(props) {
    return (
        <div className={styles.container}>
            <Meta title={"HOME"}>
                <meta name="description" content="About" />
            </Meta>
            <h2>Popular Movies</h2>
            <div className={styles.popular}>
                {props.HeadpopMovieData ??
                    props.popMovieData?.results.map((movie, i) => {
                        return (
                            <MovieCard
                                key={i}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                                release_date={movie.release_date}
                                vote_average={movie.vote_average}
                            />
                        );
                    })}
            </div>

            <div className={styles.nowplaying}></div>
        </div>
    );
}

// export const getStaticProps = async () => {
//     const API_KEY = process.env.REACT_APP_API_KEY;
//     const BASE_URL = "https://api.themoviedb.org/3/";
//     const res = await fetch(
//         `${BASE_URL}movie/popular?api_key=${API_KEY}&page=1`
//     );
//     const data = await res.json();
//     return {
//         props: {
//             popMovieData: data,
//         },
//     };
// };

export async function getServerSideProps(context) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3/";
    const res = await fetch(
        `${BASE_URL}movie/popular?api_key=${API_KEY}&page=1`
    );
    const data = await res.json();
    return {
        props: {
            popMovieData: data,
        },
    };
}
