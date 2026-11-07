import type { Milestone } from "../_data/about-content";
import styles from "../about.module.css";

export default function Timeline({ milestones }: { milestones: Milestone[] }) {
    return (
        <ol className={ styles.timeline }>
            { milestones.map((milestone) => (
                <li key={ milestone.year }>
                    <time>{ milestone.year }</time>
                    <p>{ milestone.text }</p>
                </li>
            )) }
        </ol>
    );
}
