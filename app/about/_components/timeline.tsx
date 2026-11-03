"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Milestone } from "../_data/about-content";
import styles from "../about.module.css";
import PhotoSlot from "./photo-slot";

// History slider: years across the top, one photo and caption per year, arrows on the sides.
export default function Timeline({ milestones }: { milestones: Milestone[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const lastIndex = milestones.length - 1;
    const goToMilestone = (targetIndex: number) => setActiveIndex(Math.max(0, Math.min(lastIndex, targetIndex)));
    const activeMilestone = milestones[activeIndex];
    const milestonePhoto = activeMilestone.photo ?? { src: "", alt: "", placeholder: `A photo from ${activeMilestone.year}` };

    return (
        <div
            className={styles.slider}
            role="group"
            aria-roledescription="carousel"
            aria-label="Council history"
            onKeyDown={(keyboardEvent) => {
                if (keyboardEvent.key === "ArrowRight") goToMilestone(activeIndex + 1);
                if (keyboardEvent.key === "ArrowLeft") goToMilestone(activeIndex - 1);
            }}
        >
            <ol className={styles.years}>
                {milestones.map((milestone, milestoneIndex) => (
                    <li key={milestone.year}>
                        <button
                            type="button"
                            className={milestoneIndex === activeIndex ? `${styles.year} ${styles.yearActive}` : styles.year}
                            aria-current={milestoneIndex === activeIndex ? "step" : undefined}
                            onClick={() => goToMilestone(milestoneIndex)}
                        >
                            {milestone.year}
                        </button>
                    </li>
                ))}
            </ol>
            <div className={styles.slideRow}>
                <button type="button" className={styles.arrow} onClick={() => goToMilestone(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Earlier year">
                    <ChevronLeft size={40} strokeWidth={1.5} aria-hidden="true" />
                </button>
                <div className={styles.slide} aria-live="polite">
                    <PhotoSlot photo={milestonePhoto} className={styles.slidePhoto} />
                    <p className={styles.slideCaption}>{activeMilestone.text}</p>
                </div>
                <button type="button" className={styles.arrow} onClick={() => goToMilestone(activeIndex + 1)} disabled={activeIndex === lastIndex} aria-label="Later year">
                    <ChevronRight size={40} strokeWidth={1.5} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
