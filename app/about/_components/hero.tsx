import type { Photo } from "../_data/about-content";
import Link from "next/link";
import styles from "../about.module.css";

type Props = { title: string; photo: Photo; nextId: string; breadcrumbs: { label: string; href?: string }[]; subtitle?: string };

export default function Hero({ title, photo, breadcrumbs, subtitle }: Props) {
    return (
        <section className={ styles.hero } aria-labelledby="page-title">
            { photo.src && (
                // eslint-disable-next-line @next/next/no-img-element -- photo paths are managed in about-content.ts
                <img className={ styles.heroImg } src={ photo.src } alt={ photo.alt } />
            ) }
            <div className={ styles.heroShade } aria-hidden="true" />
            <div className={ styles.heroContent }>
                <nav className={styles.heroBreadcrumbs} aria-label="Breadcrumb">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <span key={breadcrumb.label}>
                            {index > 0 && <span aria-hidden="true">/</span>}
                            {breadcrumb.href ? (
                                <Link className={styles.heroBreadcrumbLink} href={breadcrumb.href}>{breadcrumb.label}</Link>
                            ) : (
                                <span aria-current="page">{breadcrumb.label}</span>
                            )}
                        </span>
                    ))}
                </nav>
                <h1 id="page-title">{ title }</h1>
                { subtitle && <div className={ styles.heroSubtitle }>{ subtitle }</div> }
            </div>
        </section>
    );
}
