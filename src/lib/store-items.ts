export type StoreItem = {
  id: string;
  name: string;
  blurb: string;
  href: string;
  vendor: string;
  imageSrc: string;
  imageAlt: string;
  price?: string;
  format?: string;
  accent?: "yellow" | "blue" | "green" | "pink";
};

export const featuredStoreItems: StoreItem[] = [
  {
    id: "isni-single",
    name: "I Shouldn't Need It",
    blurb: "Latest single, available now through the official release page.",
    href: "https://play.mw.fm/i-shouldn-t-need-it",
    vendor: "MW.FM",
    imageSrc: "/assets/images/kruuk_roze.png",
    imageAlt: "The Kruuk artwork for I Shouldn't Need It",
    format: "Digital Single",
    accent: "yellow",
  },
  {
    id: "going-mad",
    name: "Going Mad",
    blurb: "Previous single, available on Apple Music.",
    href: "https://music.apple.com/za/album/going-mad-single/1756516758",
    vendor: "Apple Music",
    imageSrc: "/assets/images/kruuk_light.png",
    imageAlt: "The Kruuk artwork for Going Mad",
    format: "Single",
    accent: "blue",
  },
  {
    id: "artist-page",
    name: "The Kruuk Catalog",
    blurb: "Browse the full artist page and stream the released material.",
    href: "https://music.apple.com/za/artist/the-kruuk/1756516525",
    vendor: "Apple Music",
    imageSrc: "/assets/images/kruuk.png",
    imageAlt: "The Kruuk artist artwork",
    format: "Artist Page",
    accent: "green",
  },
  {
    id: "instagram-drops",
    name: "Latest Drops",
    blurb: "Follow new release announcements and item drops on Instagram.",
    href: "https://www.instagram.com/thekruuk",
    vendor: "Instagram",
    imageSrc: "/assets/images/background2.jpeg",
    imageAlt: "The Kruuk band photo",
    format: "Updates",
    accent: "pink",
  },
];
