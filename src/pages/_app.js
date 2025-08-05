import "@/styles/app.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";


export default function App({ Component, pageProps }) {


  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
       <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
