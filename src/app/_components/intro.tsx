import { CMS_NAME } from "@/lib/constants";
import { imageURL } from "@/lib/imageurl";
import Image from "next/image";
import Link from "next/link";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-center mt-2 mb-2">
      {/* <h1 className="text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        The Kruuk
      </h1> */}
      <Link href="/">
        <Image src={imageURL("/assets/images/kruuk_roze.png")} height={70} width={200} alt="Kruuk logo"
          className="block dark:hidden"
        ></Image>
        <Image src={imageURL("/assets/images/kruuk_light.png")} height={50} width={150} alt="Kruuk logo"
          className="hidden dark:block my-8"
        ></Image>
      </Link>
    </section>
  );
}
