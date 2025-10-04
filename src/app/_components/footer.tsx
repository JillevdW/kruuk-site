import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";
import { imageURL } from "@/lib/imageurl";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:border-slate-600 dark:bg-slate-800">
      <Container>
        <div className="flex content-center justify-center">
          <div className="flex-grow"></div>
          <Link href="https://open.spotify.com/artist/5WtVI5nBs62jIhw7OQxfxr" className="m-4 flex items-center">
            <Image src={imageURL("/assets/images/socials/spotify.svg")} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={imageURL("/assets/images/socials/spotify_light.svg")} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>

          <Link href="https://www.instagram.com/thekruukband/" className="m-4 flex items-center">
            <Image src={imageURL("/assets/images/socials/instagram.svg")} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={imageURL("/assets/images/socials/instagram_light.svg")} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>

          <Link href="https://www.youtube.com/@thekruukband" className="m-4 flex items-center">
            <Image src={imageURL("/assets/images/socials/youtube.svg")} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={imageURL("/assets/images/socials/youtube_light.svg")} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>

          <Link href="https://music.apple.com/nl/artist/the-kruuk/1756516525" className="m-4 flex items-center">
            <Image src={imageURL("/assets/images/socials/applemusic.svg")} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={imageURL("/assets/images/socials/applemusic_light.svg")} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>
          <div className="flex-grow"></div>
        </div>
        {/* <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Read Documentation
            </a>
            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div> */}
      </Container>
    </footer>
  );
}

export default Footer;
