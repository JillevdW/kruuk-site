import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLinktreePage, linktreePages } from "@/lib/linktrees";
import styles from "./page.module.css";

const linkPalettes = [
  { bg: "#FBEA26", ink: "#0a0a0a", shadow: "rgba(251, 234, 38, 0.24)" },
  { bg: "#8CD0E2", ink: "#071114", shadow: "rgba(140, 208, 226, 0.22)" },
  { bg: "#83F007", ink: "#081205", shadow: "rgba(131, 240, 7, 0.22)" },
  { bg: "#0259C9", ink: "#f2f7ff", shadow: "rgba(2, 89, 201, 0.24)" },
  { bg: "#F83BA4", ink: "#18060f", shadow: "rgba(248, 59, 164, 0.22)" },
];

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return linktreePages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLinktreePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | Links`,
    description: page.description,
  };
}

export default async function LinktreePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLinktreePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main
      className={styles.page}
      style={
        {
          "--linktree-accent": "#FBEA26",
        } as React.CSSProperties
      }
    >
      <div className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.imageWrap}>
            {page.imageSrc ? (
              <Image
                src={page.imageSrc}
                alt={page.title}
                fill
                priority
                sizes="(min-width: 720px) 32rem, 100vw"
                className={styles.image}
              />
            ) : null}
          </div>

          <div className={styles.heroBody}>
            <h1 className={styles.title}>{page.title}</h1>
          </div>
        </section>

        <ul className={styles.links}>
          {page.links.map((link, index) => {
            const isExternal = /^https?:\/\//.test(link.href);
            const palette = linkPalettes[index % linkPalettes.length];

            return (
              <li
                key={`${page.slug}-${link.href}`}
                className={styles.linkItem}
                style={
                  {
                    "--link-tilt": index % 2 === 0 ? "-0.8deg" : "0.8deg",
                    "--link-bg": palette.bg,
                    "--link-ink": palette.ink,
                    "--link-shadow": palette.shadow,
                  } as React.CSSProperties
                }
              >
                <Link
                  href={link.href}
                  className={styles.link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  {link.description ? (
                    <span className={styles.linkDescription}>{link.description}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
