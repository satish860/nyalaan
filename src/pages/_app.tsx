import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

const publicPages = ["/"];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <>
      <Head>
        <title>Nyalaan</title>
      </Head>
      <ClerkProvider {...pageProps}>
        {isPublicPage ? (
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        ) : (
          <>
            <SignedIn>
              <ChakraProvider>
                <Component {...pageProps} />
              </ChakraProvider>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn
                afterSignInUrl="/transcription"
                redirectUrl="/"
              />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </>
  );
}
