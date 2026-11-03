import type { Metadata } from "next";
import Hero from "../_components/hero";
import PhotoSlot from "../_components/photo-slot";
import { community, photos } from "../_data/about-content";
import styles from "../about.module.css";

export const metadata: Metadata = {
    title: "Community | World Affairs Council of Hilton Head",
};

// Community page: hero, centered intro, one key figure, then a photo gallery.
// TODO: community content
export default function CommunityPage() {
    return (
        <>
            <Hero title="Community" photo={photos.communityHero} nextId="community-intro" />

            <section id="community-intro" className={styles.intro}>
                <div className="content-width">
                    <h2 className={styles.centerTitle}>{community.heading}</h2>
                    <p className={styles.centerText}>{community.intro}</p>
                </div>
            </section>

            <section className={styles.stats} aria-label="Community at a glance">
                <div className={`content-width ${styles.bigStat}`}>
                    <p className={styles.bigStatValue}>{community.stat.value}</p>
                    <p className={styles.bigStatText}>{community.stat.text}</p>
                </div>
            </section>

            <section className={styles.centerBlock} aria-labelledby="gallery-title">
                <div className="content-width">
                    <h2 id="gallery-title" className={`${styles.centerTitle} ${styles.titleGap}`}>Gallery</h2>
                    <div className={styles.gallery}>
                        {photos.gallery.map((galleryPhoto) => <PhotoSlot key={galleryPhoto.placeholder} photo={galleryPhoto} className={styles.galleryItem} />)}
                    </div>
                </div>
            </section>
        </>
    );
}
