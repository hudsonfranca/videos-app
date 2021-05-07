import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`

            #__next {
              min-height: 10vh;

            }
          `}</style>
        </body>
      </html>
    );
  }
}
