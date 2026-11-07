import type { Photo } from "../_data/about-content";
import styles from "../about.module.css";

type Props = { photo: Photo; className?: string };

export default function PhotoSlot({ photo, className = "" }: Props) {
    if (!photo.src) return null;
    return <figure className={ `${ styles.photo } ${ className }` }>
        {/* eslint-disable-next-line @next/next/no-img-element -- photo paths are managed in about-content.ts */}
        <img src={ photo.src } alt={ photo.alt } loading="lazy" decoding="async" />
    </figure>;
}
