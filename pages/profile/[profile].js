import Like from "@/components/like/like";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
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
                {user && <img alt="user avatar" src={user.picture} />}
                <ul>
                    {user.given_name ? (
                        <li className={styles["list-item"]}>{user.name}</li>
                    ) : null}
                    {user.nickname ? (
                        <li className={styles["list-item"]}>{user.nickname}</li>
                    ) : null}
                </ul>
                {user && (
                    <>
                        <h1>Films to watch</h1>
                        <LikeForm />
                        <ul className={styles["likes"]}>
                            {likes &&
                                likes.map((like) => (
                                    <Like key={like.id} like={like} />
                                ))}
                        </ul>
                    </>
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
