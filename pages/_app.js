import { UserProvider } from "@auth0/nextjs-auth0";
import { LikesProvider } from "context/likesContext";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import "../styles/main.scss";
function MyApp({ Component, pageProps }) {
    return (
        <LikesProvider>
            <UserProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserProvider>
        </LikesProvider>
    );
}

export default MyApp;
