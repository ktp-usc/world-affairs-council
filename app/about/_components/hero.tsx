import type { Photo } from "../_data/about-content";
import styles from "../about.module.css";

type Props = { title: string; photo: Photo; nextId: string; subtitle?: string };

export default function Hero({ title, photo, subtitle }: Props) {
    return (
        <section className={ styles.hero } aria-labelledby="page-title">
            { photo.src && (
                // eslint-disable-next-line @next/next/no-img-element -- photo paths are managed in about-content.ts
                <img className={ styles.heroImg } src={ photo.src } alt={ photo.alt } />
            ) }
            <div className={ styles.heroShade } aria-hidden="true" />
            <div className={ styles.heroContent }>
                <p>World Affairs Council of Hilton Head</p>
                <h1 id="page-title">{ title }</h1>
                { subtitle && <div className={ styles.heroSubtitle }>{ subtitle }</div> }
            </div>
        </section>
    );
}
