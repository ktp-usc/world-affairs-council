import type { Metadata } from "next";
import Hero from "../_components/hero";
import PersonCard from "../_components/person-card";
import { contact, directors, officers, photos, programCommittee, staff, teamTitle } from "../_data/about-content";
import styles from "../about.module.css";

export const metadata: Metadata = {
    title: "Our Team | World Affairs Council of Hilton Head",
    description: "The volunteer board, staff, and Program Committee behind the World Affairs Council of Hilton Head.",
};

// Team page: hero, one centered title, then a card grid per category.
const teamGroups = [
    { id: "board", title: "Executive Committee", people: officers },
    { id: "directors", title: "Directors", people: directors },
    { id: "administration", title: "Administration", people: staff },
    { id: "program-committee", title: "Program Committee", people: programCommittee.members },
];

export default function TeamPage() {
    return (
        <>
            <Hero title="Our Team" photo={photos.teamHero} nextId="members" />

            <section id="members" className={styles.members} aria-labelledby="members-title">
                <div className="content-width">
                    <h2 id="members-title" className={styles.centerTitle}>{teamTitle}</h2>
                    {teamGroups.map((group) => (
                        <div key={group.id} id={group.id} className={styles.category}>
                            <h3 className={styles.categoryTitle}>{group.title}</h3>
                            {group.id === "program-committee" && <p className={styles.centerText}>{programCommittee.purpose}</p>}
                            <ul className={styles.memberGrid}>
                                {group.people.map((person) => <PersonCard key={group.id + person.name} person={person} />)}
                            </ul>
                            {group.id === "administration" && (
                                <p className={styles.contactLine}>
                                    {contact.office} · <a href={`tel:${contact.phone.replace(/-/g, "")}`}>{contact.phone}</a> ·{" "}
                                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
