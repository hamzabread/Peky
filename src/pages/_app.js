import "../styles/app.css"
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Urbanist, DM_Sans } from "next/font/google";
import WhatsAppButton from "../components/Landing/WhatsAppButton/WhatsAppButton";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${urbanist.variable} ${dmSans.variable}`}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="description"
          content="Peky is a Pakistani company that sells premium aluminium foil"
        ></meta>
        <title>Peky │ Pakistan's Best Aluminium Foil</title>
              {/* Standard favicon */}
        <link rel="icon" href="/favicon/favicon.ico" />

        {/* PNG icons */}
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/web-app-manifest-512x512.png" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />

        {/* SVG icon (modern browsers) */}
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />

        {/* Manifest */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <ToastContainer />
      <WhatsAppButton />
      <Component {...pageProps} />
    </div>
  );
}
