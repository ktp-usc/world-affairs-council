"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../about.module.css";

const aboutTabs = [
    { href: "/about", label: "About Us" },
    { href: "/about/team", label: "Our Team" },
    { href: "/about/community", label: "Community" },
];

export default function AboutTabs() {
    const pathname = usePathname();

    return (
        <nav className={styles.tabBar} aria-label="About section">
            <div className={styles.tabInner}>
                {aboutTabs.map((tab) => {
                    const isActiveTab = pathname === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={isActiveTab ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                            aria-current={isActiveTab ? "page" : undefined}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
