import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";

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
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
