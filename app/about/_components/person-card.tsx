import type { Person } from "../_data/about-content";
import styles from "../about.module.css";

function getInitials(name: string) {
    const nameParts = name.replace(/[^A-Za-z' ]/g, "").split(" ").filter(Boolean);
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
}

// Team card: portrait, name, role. Initials hold the portrait's place until headshots exist.
export default function PersonCard({ person }: { person: Person }) {
    return (
        <li className={styles.member}>
            <span className={styles.memberImage} data-initials={getInitials(person.name)} aria-hidden="true" />
            <span className={styles.memberName}>{person.name}</span>
            {person.role && <span className={styles.memberRole}>{person.role}</span>}
        </li>
    );
}
