import { Post } from "@/interfaces/post";
import { PostPreview } from "../_components/post-preview";
import { getArtistGigs, getArtistInfo } from "@/lib/bandsintown_api";
import { Gig } from "@/app/components/gig";
import { getScrapImages } from "@/lib/api";
import { Wristband } from "./wristband";

// type Props = {
//   posts: Post[];
// };

let artistInfo = await getArtistInfo();
let gigs = await getArtistGigs(artistInfo.name);
let scrapImages = getScrapImages()
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

let rotations = [
  "rotate-2",
  "-rotate-0",
  "-rotate-1",
  "rotate-1",
  "rotate-0",
  "-rotate-2",
]
// let rotations = scrapImages.map((e, index) => `rotate-[${index * 10}]`);

export function GigList(
    // { posts }: Props
) {
    
  return (
    <section>
      {/* <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2> */}
      <div className="grid grid-cols-1 lg:grid-cols-8 xl:grid-cols-6">
        {gigs.map((gig, index) => (
          <div className={"m-4 lg:col-span-6 lg:col-start-2 xl:col-span-4 xl:col-start-2 hover:scale-105 transition ease-in-out " + rotations[gigs.length%(index+1)]}>
            <Wristband
              key={index}
              title={gig.title ?? ""}
              date={gig.datetime}
              venueName={gig.venue.name}
              city={gig.venue.city}
              url={gig.url}
            />
          </div>
        ))}
      </div>
      
      {/* <div className="grid justify-items-center grid-cols-1 col gap-y-2 md:gap-y-4 mb-4">
        {gigs.map((gig, index) => (
            <div className={"hover:scale-105 transition ease-in-out w-[900px] transform " + rotations[gigs.length%(index+1)]}>
              <Gig
                key={index}
                title={gig.title ?? ""}
                date={gig.datetime}
                venueName={gig.venue.name}
                city={gig.venue.city}
                url={gig.url}
                backgroundImage={scrapImages[gigs.length%(index+1)]}
              />
            </div>
        ))}
      </div> */}
    </section>
  );
}
