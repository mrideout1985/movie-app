import Like from "@/components/like/like";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { table, minifyRecords } from "../../pages/api/utils/Airtable";
import { LikesContext } from "../../context/likesContext";
import { useEffect, useContext } from "react";
import styles from "../../styles/Profile.module.scss";

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
                <ul className={styles["likes"]}>
                    {likes &&
                        likes.map((like) => <Like key={like.id} like={like} />)}
                </ul>
            </div>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const { req, res, query } = ctx;
        const { profile } = query;
        const session = getSession(req, res);
        const likes = await table.select({}).firstPage();

        if (profile !== session.user.nickname) {
            return {
                redirect: {
                    destination: `/profile/${session.user.nickname}`,
                    permanent: true,
                },
            };
        }

        return {
            props: {
                initialLikes: minifyRecords(likes),
            },
        };
    },
});
