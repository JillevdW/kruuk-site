import Footer from "@/app/_components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `The Kruuk`,
  description: `The Kruuk | Official Website | All our upcoming shows.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "relative dark:bg-slate-950 dark:text-slate-300 bg-[#FEFEFE] page-background-image backdrop-blur-lg overflow-y-scroll overflow-x-clip flex flex-col")}
      >
        <div className="w-full h-full absolute overflow-auto z-[-1]">
          <iframe className="
            w-full h-full absolute top-[150px] z-[-1] max-h-screen max-w-screen
            pointer-events-none user-select-none
            hidden md:block
            scale-[1.7] lg:scale-[2]
          "
            src="https://www.youtube.com/embed/DD-kQYgZHPM?playlist=DD-kQYgZHPM&loop=1&autoplay=1&mute=1&controls=0&start=38" // 168 is cool too
          />
        </div>
        {/* <ThemeSwitcher /> */}
        <div className="flex flex-col items-stretch min-h-screen">
          <div className="">{children}</div>
          <div className="grow h-full"></div>
          <div className="self-end w-full mt-auto">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
