'use client';
import "@/styles/app.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Urbanist, DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-urbanist',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${urbanist.variable} ${dmSans.variable}`}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Peky is a company that sells premium aluminium foil"></meta>
        <title>Peky</title>
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </div>
  );
}
