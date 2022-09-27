import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { ListsProvider } from "../context/ListsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="white" />
        <meta name="description" content="Share and discover great recipes!" />
        <title>Recipes</title>
      </Head>
      <AuthProvider>
        <ListsProvider>
          <Component {...pageProps} />
        </ListsProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
