import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import "../styles/main.scss";
function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}

export default MyApp;
