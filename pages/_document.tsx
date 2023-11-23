import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/icons/rick-morty-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rick and Morty Characters</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
