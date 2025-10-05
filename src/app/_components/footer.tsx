import Container from "@/app/_components/container";
import Link from "next/link";
import Image from "next/image";
import { imageURL } from "@/lib/imageurl";

const spotify = "/assets/images/socials/spotify.svg";
const spotify_light = "/assets/images/socials/spotify_light.svg";
const instagram = "/assets/images/socials/instagram.svg";
const instagram_light = "/assets/images/socials/instagram_light.svg";
const youtube = "/assets/images/socials/youtube.svg";
const youtube_light = "/assets/images/socials/youtube_light.svg";
const applemusic = "/assets/images/socials/applemusic.svg";
const applemusic_light = "/assets/images/socials/applemusic_light.svg";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:border-slate-600 dark:bg-slate-800 bg-[url(/assets/images/banner-min.avif)] bg-cover bg-center">
      <Container>
        <div className="flex content-center justify-center pt-48 pb-8">
          <div className="flex-grow"></div>
          <div className="flex content-center justify-center bg-gray-200 dark:bg-slate-800 bg-opacity-70 dark:bg-opacity-70 rounded-lg">
          <Link href="https://open.spotify.com/artist/5WtVI5nBs62jIhw7OQxfxr" className="m-4 flex items-center">
            <Image src={spotify} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={spotify_light} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>

          <Link href="https://www.instagram.com/thekruukband/" className="m-4 flex items-center">
            <Image src={instagram} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={instagram_light} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>

          <Link href="https://www.youtube.com/@thekruukband" className="m-4 flex items-center">
            <Image src={youtube} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={youtube_light} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>

          <Link href="https://music.apple.com/nl/artist/the-kruuk/1756516525" className="m-4 flex items-center">
            <Image src={applemusic} width={40} height={40} alt="Spotify icon" className="block dark:hidden"></Image>
            <Image src={applemusic_light} width={40} height={40} alt="Spotify icon" className="hidden dark:block"></Image>
          </Link>
          </div>
          <div className="flex-grow"></div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
