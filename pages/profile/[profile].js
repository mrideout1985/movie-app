import Like from "@/components/like/like";
import { getSession } from "@auth0/nextjs-auth0";
import { table, minifyRecords } from "../../pages/api/utils/Airtable";
import { LikesContext } from "../../context/likesContext";
import { useEffect, useContext } from "react";
import styles from "../../styles/Profile.module.scss";
import LikeForm from "@/components/likeForm/likeForm";

export default function Profile({ user, initialLikes }) {
    // eslint-disable-next-line @next/next/no-img-element

    const { likes, setLikes } = useContext(LikesContext);

    useEffect(() => {
        setLikes(initialLikes);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.user}>
                {user && <img alt="user avatar" src={user.picture} />}
                    {user.given_name ? (
                        <div className={styles["user-data"]}>{user.name}</div>
                    ) : null}
                    {user.nickname ? (
                        <div className={styles["user-data"]}>{user.nickname}</div>
                    ) : null}
                </div>
                {user && (
                    <div className={styles.watchlist}>
                        <h1>Watch list</h1>
                        <div className={styles["likes"]}>
                            {likes &&
                                likes.map((like) => (
                                    <Like key={like.id} like={like} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context.req, context.res);
    let likes = [];
    try {
        if (session?.user) {
            likes = await table
                .select({
                    filterByFormula: `id = '${session.user.sub}'`,
                })
                .firstPage();
        }
        return {
            props: {
                initialLikes: minifyRecords(likes),
                user: session?.user || null,
            },
        };
    } catch (err) {
        console.error(err);
        return {
            props: {
                err: "Something went wrong",
            },
        };
    }
}
