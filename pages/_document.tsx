import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      {/* Head here is only used for code common to all pages. Use 'next/head' for <title> etc */}
      <Head />{" "}
      <body>
        <Main />
        <div id="overlays"></div> {/* To portal elements */}
        <NextScript />
      </body>
    </Html>
  );
}
