/*
import type { Metadata } from "next";
import Hero from "../_components/hero";
import { photos } from "../_data/about-content";

export const metadata: Metadata = {
    title: "Our Team | World Affairs Council of Hilton Head",
    description: "The volunteer board, staff, and Program Committee behind the World Affairs Council of Hilton Head.",
};

export default async function TeamPage() {
  // one request to sanity for every member
  const members: TeamMemberCardData[] = await client.fetch(
    TEAM_MEMBERS_QUERY,
    {},
    { next: { revalidate: 60 } },
  )

  // single pass: build { programCommittee: [...], leadership: [...], ... }
  const groups: Record<string, TeamMemberCardData[]> = {}
  for (const member of members) {
    // anyone missing a category lands in "other" instead of vanishing
    const key = member.category ?? 'other'
    ;(groups[key] ??= []).push(member)
  }

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
} */

    // app/teammember/page.tsx
import { client } from '@/sanity/lib/client'
import { TEAM_MEMBERS_QUERY } from '@/sanity/lib/queries'
import { CATEGORIES } from '@/sanity/lib/categories'
import { TeamMemberCard, type TeamMemberCardData } from '@/components/TeamMemberCard'
import type { Metadata } from "next";
import Hero from "../_components/hero";
import PersonCard from "../_components/person-card";
import { contact, directors, officers, photos, programCommittee, staff, teamTitle } from "../_data/about-content";
import styles from "../about.module.css";

export const metadata: Metadata = {
    title: "Our Team | World Affairs Council of Hilton Head",
    description: "The volunteer board, staff, and Program Committee behind the World Affairs Council of Hilton Head.",
};

export default async function TeamPage() {
  // one request to sanity for every member
  const members: TeamMemberCardData[] = await client.fetch(
    TEAM_MEMBERS_QUERY,
    {},
    { next: { revalidate: 60 } },
  )

  // single pass: build { programCommittee: [...], leadership: [...], ... }
  const groups: Record<string, TeamMemberCardData[]> = {}
  for (const member of members) {
    // anyone missing a category lands in "other" instead of vanishing
    const key = member.category ?? 'other'
    ;(groups[key] ??= []).push(member)
  }

  // known categories in your chosen order, then a catch-all section at the end
  const sections = [...CATEGORIES, { title: 'Other', value: 'other' }]

  return (
    <>
    <Hero title="Our Team" photo={photos.teamHero} nextId="members" breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Our Team" }]} />
    <main className="mx-auto max-w-6xl px-4 py-12">
      {sections.map((cat) => {
        const group = groups[cat.value]
        // skip categories with nobody in them yet
        if (!group?.length) return null
        return (
          <section key={cat.value} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">{cat.title}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
              {group.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
            </div>
          </section>
        )
      })}
    </main>
    </>
  )
}