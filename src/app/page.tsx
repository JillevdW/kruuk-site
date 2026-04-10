import Image from "next/image";
import { KineticGigList } from "./live/_components/kinetic-giglist";
import { featuredStoreItems } from "@/lib/store-items";
import styles from "./live/page.module.css";

const overlays = [
  "APR 18 / AMSTERDAM",
  "POST-PUNK / LIVE",
  "KRUUK / SIDE A",
  "CATALOG KRUUK-02",
];

export default function LivePage() {
  return (
    <main className={styles.page}>
      <div className={styles.grain} />

      <header className={styles.topbar}>
        <p className={styles.topLink}>THE KRUUK</p>
        <p className={styles.badge}>
          {/* WTFISTHEKRUUK / 2026 */}
          </p>
        <a href="https://www.instagram.com/thekruuk" className={styles.topLink} target="_blank" rel="noreferrer">
          INSTAGRAM
        </a>
      </header>

      <section className={styles.hero}>
        <div className={styles.imageLayer}>
          <Image src="/assets/images/background2.jpeg" alt="Blurred black and white band portrait" fill priority sizes="100vw" style={{objectFit: "cover"}} />
          <div className={styles.vignette} />
        </div>

        {/* <p className={styles.kicker}>Underground Poster Motion / One Page Experience</p> */}

        <div>
          <h1 className={styles.title}>
            THE KRUUK
            <span>I SHOULDN'T NEED IT</span>
          </h1>
          <div className={styles.sw_glitch_block_1}></div>
          <div className={styles.sw_glitch_block_2}></div>
          <div className={styles.sw_glitch_block_3}></div>
          <div className={styles.sw_glitch_block_4}></div>
          <div className={styles.sw_glitch_block_5}></div>
        </div>

        <p className={styles.subcopybold}>
          Listen now on <a href="https://play.mw.fm/i-shouldn-t-need-it" className="hover:underline text-band-accent">all streaming services</a>.
        </p>

        {/* <div className={styles.actions}>
          <Link href="/setlist" className={styles.primaryBtn}>Open setlist</Link>
          <Link href="/bookers" className={styles.ghostBtn}>Booking info</Link>
        </div> */}

        {/* <div className={styles.labels}>
          {overlays.map((text, idx) => (
            <p key={text} className={styles.label} style={{ transform: idx % 2 === 0 ? "rotate(-4deg)" : "rotate(4deg)" }}>
              {text}
            </p>
          ))}
        </div> */}

        <p className={styles.vertical}>SIDE B / LIVE NOISE / 2026</p>
      </section>

      <section className={styles.infoGrid}>
        <article>
          <p className={styles.metaHead}>Upcoming Shows / Live Feed</p>
          <KineticGigList />
        </article>

        <article>
          <p className={styles.metaHead}>About The Band</p>
          <p className={styles.aboutCopy}>
            The Kruuk is a four-piece rock band driven to turn every gig into a party. Their sound blends alternative rock with touches of ska, reggae, and punk, channeling influences like The Clash and Red Hot Chili Peppers into something punchy, raw, and LOUD.
          </p>
          {/* <p className={styles.aboutCopy}>
            
          </p> */}
        </article>
      </section>
    </main>
  );
}
