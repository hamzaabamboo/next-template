import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../src/state/index";
import { appWithTranslation } from "next-i18next";
import { PageContext } from "types/PageContext";
import Head from "next/head";
import theme from "src/theme";
import { AppWrapper } from "~/components/AppWrapper";
import i18nextConfig from "../next-i18next.config";

function MyApp({ Component, pageProps }: AppProps<PageContext>) {
  const { isStatic, head, backgroundImage } = pageProps as PageContext;
  const { title, image, description, url, banner } = head || {};

  const DEFAULT_TITLE = "Media Collection";
  const DEFAULT_DESCRIPTION = "Created by HamP";

  return (
    <>
      <Head>
        <title>{title || DEFAULT_TITLE}</title>
        <link rel="icon" href={"favicon.ico"} />
        <meta property="og:type" content={"website"} />
        <meta property="og:title" content={title || DEFAULT_TITLE} />
        <meta property="og:site_name" content={DEFAULT_TITLE} />
        <meta property="og:url" content={url} />
        {typeof image === "string" ? (
          <meta property="og:image" content={image as string} />
        ) : (
          typeof image === "object" &&
          image.map((i, idx) => {
            return <meta key={idx} property="og:image" content={i} />;
          })
        )}
        <meta
          property="og:description"
          content={description || DEFAULT_DESCRIPTION}
        />
        {banner && <meta name="twitter:card" content="summary_large_image" />}
        <meta name="twitter:site" content="@HamP_punipuni" />
        {banner && <meta name="twitter:image:src" content={banner} />}
        <meta name="twitter:title" content={title || DEFAULT_TITLE} />
        <meta
          name="twitter:description"
          content={description || DEFAULT_DESCRIPTION}
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp, i18nextConfig);
