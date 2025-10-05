import DateFormatter from "@/app/_components/date-formatter";
import Link from "next/link";
import Image from 'next/image'
const squiggle = "./assets/images/squiggle.svg"
const arrow = "./assets/images/arrow.svg"

type Props = {
  title: string;
  date?: string;
  venueName: string;
  city: string;
  url: string;
};

export function Wristband({
  title,
  date,
  venueName,
  city,
  url,
}: Props) {

    let colorCombinations = [
        {
            bg: "bg-band-purple",
            text: "text-band-green"
        },
        {
            bg: "bg-band-yellow",
            text: "text-band-blue"
        },
        {
            bg: "bg-band-pink",
            text: "text-band-yellow"
        },
        {
            bg: "bg-band-blue",
            text: "text-band-light-blue"
        }
    ];

    const color = colorCombinations[Math.floor(Math.random() * colorCombinations.length)];

  return (
    <div className="group">
    <Link href={url} className="">
        <div className={
            `${color.bg} ${color.text} font-bold font-serif flex shadow-md hover-group:shadow-xl`
        }>
            <div className="
                bg-slate-100 w-20 flex-none ml-3
                grid justify-center content-center grid-cols-4 p-2
            ">
                <Image className="" src={squiggle} alt="Squiggle on the wristband." width={16} height={40}></Image>
                <Image className="" src={squiggle} alt="Squiggle on the wristband." width={16} height={40}></Image>
                <Image className="" src={squiggle} alt="Squiggle on the wristband." width={16} height={40}></Image>
                <Image className="" src={squiggle} alt="Squiggle on the wristband." width={16} height={40}></Image>
            </div>

            <div className="flex-1 pl-2 md:pl-4 flex flex-col justify-center">
                <div className="group-hover:underline text-sm md:text-xl">
                {city} - {venueName}
                </div>

                {
                    date != null 
                    ? <div className="mr-4 flex items-center text-[10px] md:text-base">
                        <DateFormatter dateString={date} />
                    </div>
                    : <div></div>
                }
                
            </div>

            <div className="
                w-14 flex-none mr-3 
                bg-slate-100 text-slate-700 leading-4 not-italic text-4xl
                grid gap-0 justify-center content-center
            ">
                <Image className="opacity-[.40] scale-[.70]" src={arrow} alt="Arrow on the wristband." width={30} height={10}></Image>
                <Image className="opacity-[.40] scale-[.70]" src={arrow} alt="Arrow on the wristband." width={30} height={10}></Image>
                <Image className="opacity-[.40] scale-[.70]" src={arrow} alt="Arrow on the wristband." width={30} height={10}></Image>
                <Image className="opacity-[.40] scale-[.70]" src={arrow} alt="Arrow on the wristband." width={30} height={10}></Image>
            </div>
    
        </div>
    </Link>
    </div>
  );
}
