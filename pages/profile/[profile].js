/* eslint-disable @next/next/no-html-link-for-pages */
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Profile({ user }) {
    // eslint-disable-next-line @next/next/no-img-element
    console.log(user);
    return (
        <div>
            {user && <img alt="user avatar" src={user.picture} />}
            <ul>
                {user.given_name ? (
                    <li>First Name: {user.given_name}</li>
                ) : null}
            </ul>
            <a href="/api/auth/logout">Logout</a>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const { req, res, query } = ctx;
        const { profile } = query;
        const session = getSession(req, res);

        if (profile !== session.user.nickname) {
            return {
                redirect: {
                    destination: `/profile/${session.user.nickname}`,
                    permanent: true,
                },
            };
        }

        return {
            props: {},
        };
    },
});
