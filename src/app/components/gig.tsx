import DateFormatter from "@/app/_components/date-formatter";
import { getScrapImages } from "@/lib/api";
import Link from "next/link";
import Image from 'next/image'

type Props = {
  title: string;
  date: string;
  venueName: string;
  city: string;
  url: string;
  backgroundImage: string;
};

export function Gig({
  title,
  date,
  venueName,
  city,
  url,
  backgroundImage,
}: Props) {

  return (
    <Link href={url} className="hover:underline">
    <div className={backgroundImage + " px-[15rem] h-48 text-wrap px-4 grid content-center justify-leading" }>
      <h3 className="text-2xl font-bold mb-3 mt-2">
        
          {city} - {venueName}
        
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
    </Link>
  );
}
