import Head from "next/head";

import "../styles/globals.css";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { Header } from "../components/Header";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Contentlayer Next.js Example</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <Header />

      <div className="px-6">
        <ClerkProvider {...pageProps}>
          {/* <SignedIn> */}
            <Component {...pageProps} />
          {/* </SignedIn> */}
          {/* <SignedOut>
            <RedirectToSignIn />
          </SignedOut> */}
        </ClerkProvider>
      </div>
    </>
  );
}
