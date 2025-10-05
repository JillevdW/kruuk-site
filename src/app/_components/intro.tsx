import { CMS_NAME } from "@/lib/constants";
import { imageURL } from "@/lib/imageurl";
import Image from "next/image";
import Link from "next/link";

const kruuk_roze_small = "/assets/images/kruuk_roze_small.png";
const kruuk_light_small = "/assets/images/kruuk_light_small.png";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-center mt-2 mb-2">
      <Link href="/">
        <Image priority src={kruuk_roze_small} height={70} width={200} alt="Kruuk logo"
          className="block dark:hidden"
        ></Image>
        <Image priority src={kruuk_light_small} height={50} width={150} alt="Kruuk logo"
          className="hidden dark:block my-8"
        ></Image>
      </Link>
    </section>
  );
}
