export type LinktreeLink = {
  label: string;
  href: string;
  description?: string;
};

export type LinktreePage = {
  slug: string;
  title: string;
  description: string;
  imageSrc?: string;
  links: LinktreeLink[];
};

export const linktreePages: LinktreePage[] = [
  {
    slug: "the-kruuk",
    title: "The Kruuk",
    description:
      "Alternative rock with ska, reggae, and punk in the bloodstream. Find the latest single, socials, live dates, and booking details here.",
    imageSrc: "/assets/images/background2.jpeg",
    links: [
      {
        label: "Presave I Shouldn't Need It",
        href: "https://play.mw.fm/i-shouldn-t-need-it",
        description: "Presave our new single, available on all streaming services!",
      },
      {
        label: "Listen to our music on Spotify",
        href: "https://open.spotify.com/artist/5WtVI5nBs62jIhw7OQxfxr",
      },
      {
        label: "Listen to our music on Apple Music",
        href: "https://music.apple.com/nl/artist/the-kruuk/1756516525",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/thekruukband/",
      },
      {
        label: "Youtube",
        href: "https://www.youtube.com/@thekruukband",
      },
    ],
  },
];

export function getLinktreePage(slug: string) {
  return linktreePages.find((page) => page.slug === slug);
}
