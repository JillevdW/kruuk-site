import { getArtistGigs, getArtistInfo } from "@/lib/bandsintown_api";
import styles from "./kinetic-giglist.module.css";

function formatDate(dateInput: string | undefined) {
  if (!dateInput) return "TBA";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "TBA";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase();
}

export async function KineticGigList() {
  const artistInfo = await getArtistInfo();
  const gigs = await getArtistGigs(artistInfo.name);

  if (!gigs.length) {
    return (
      <div className={styles.emptyState}>
        <p>NO CONFIRMED SHOWS YET</p>
        <p>CHECK BACK SOON</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {gigs.map((gig, index) => (
        <li key={`${gig.id ?? gig.url ?? gig.datetime ?? index}`} className={styles.item}>
          <div className={styles.dateCol}>{formatDate(gig.datetime)}</div>
          <div className={styles.mainCol}>
            <p className={styles.venue}>{gig.venue.name}</p>
            <p className={styles.city}>{gig.venue.city}</p>
          </div>
          <a href={gig.url || "/"} target="_blank" rel="noreferrer" className={styles.linkCol}>
            TICKETS
          </a>
        </li>
      ))}
    </ul>
  );
}
