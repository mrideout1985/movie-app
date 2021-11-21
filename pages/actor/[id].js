import api from "../api/index";
import Image from "next/image";
import styles from "../../styles/ActorPage.module.scss";

export const getStaticProps = async ({ params }) => {
  const actor = await api.actor(params.id);
  return {
    props: { actor },
  };
};

export const getStaticPaths = async () => {
  const popularActors = await api.popularActors();
  const paths = popularActors.results.map((actor) => ({
    params: { id: actor.id },
  }));
  return {
    paths: [],
    fallback: true,
  };
};

export default function ActorDetails(props) {
  const actor = props.actor;
  console.log(actor);

  if (actor) {
    return (
      <section
        className={styles.container}
        style={{
          backgroundImage: `
			url(https://image.tmdb.org/t/p/original${actor?.profile_path})`,
        }}
      >
        <div className={styles.card}>
          <div className={styles.imagecontainer}>
            <Image
              className={styles.image}
              src={`https://image.tmdb.org/t/p/original${actor?.profile_path}`}
              alt="image"
              width={450}
              height={700}
            />
          </div>

          <div className={styles.information}>
            <div>
              <h2>{actor.name}</h2>
              {actor.deathday ? (
                <h3>
                  {actor.birthday} - {actor.deathday}
                </h3>
              ) : (
                <h3>{actor.birthday}</h3>
              )}
              <div className={styles.additionalinfo}>
                {actor.place_of_birth}
              </div>
              <p>{actor.biography}</p>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}
