import { ArrowDown } from "lucide-react";
import type { Photo } from "../_data/about-content";
import styles from "../about.module.css";

type Props = { title: string; photo: Photo; nextId: string };

// Hero: a full-height photo with the page title centered on it and a scroll-down button.
// Until a photo is added it shows the home page's navy hero background.
export default function Hero({ title, photo, nextId }: Props) {
    return (
        <section className={`hero ${styles.hero}`} aria-labelledby="page-title">
            {photo.src ? (
                // eslint-disable-next-line @next/next/no-img-element -- volunteers add photos by path; no image config needed
                <img className={styles.heroImg} src={photo.src} alt={photo.alt} />
            ) : (
                <div className="hero-rings" aria-hidden="true" />
            )}
            <div className={`content-width ${styles.heroContent}`}>
                <h1 id="page-title">{title}</h1>
                {!photo.src && <p className={styles.heroNote}>Photo to come: {photo.placeholder}</p>}
            </div>
            <a className={styles.scroller} href={`#${nextId}`} aria-label="Scroll to content">
                <ArrowDown size={20} aria-hidden="true" />
            </a>
        </section>
    );
}
