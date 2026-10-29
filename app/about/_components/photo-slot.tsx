import { ImagePlus } from "lucide-react";
import type { Photo } from "../_data/about-content";
import styles from "../about.module.css";

type Props = { photo: Photo; className?: string };

// Shows the photo when one is set in about-content.ts, otherwise a labeled placeholder of the same size.
export default function PhotoSlot({ photo, className = "" }: Props) {
    if (photo.src) {
        return (
            <figure className={`${styles.photo} ${className}`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- volunteers add photos by path; no image config needed */}
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            </figure>
        );
    }

    return (
        <figure className={`${styles.photo} ${styles.photoEmpty} ${className}`} aria-hidden="true">
            <span className={styles.photoNote}>
                <ImagePlus size={26} strokeWidth={1.6} />
                <span>
                    <strong>Photo to come</strong>
                    {photo.placeholder}
                </span>
            </span>
        </figure>
    );
}
