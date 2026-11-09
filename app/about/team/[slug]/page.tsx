/*
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import {
  TEAM_MEMBER_QUERY,
  TEAM_MEMBER_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import Hero from '../../_components/hero'
import { photos } from "../../_data/about-content";

// pre-renders a page for every admin that exists at build time
// admins added later still work since next renders unknown slugs on demand
export async function generateStaticParams() {
  const slugs = await client.fetch(TEAM_MEMBER_SLUGS_QUERY);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export default async function AdminPage({
  // params is where the slug comes from
  // react sees the url /sanity-test/jane-doe, and matches it with /sanity-test/[slug], so slug becomes jane-doe
  params,
}: {
  // params is a promise in next 15+, so it has to be awaited
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formattedSlug = slug.split("-").join(" ").toUpperCase();
  const admin = await client.fetch(
    TEAM_MEMBER_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );

  // a typo'd or deleted slug gets a real 404 instead of a crash
  if (!admin) notFound();

  return (
    <>
      <Hero
        title="Our Team"
        photo={photos.teamHero}
        nextId="members"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our Team", href: "/about/team" },
          { label: formattedSlug }
        ]}
      />
      <main className="min-h-250">
        <h1>{admin.name}</h1>
        <p>{admin.role}</p>
        {admin.bio && <PortableText value={admin.bio} />}
      </main>
    </>
  );
}
*/

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { TEAM_MEMBER_QUERY, TEAM_MEMBER_SLUGS_QUERY } from "@/sanity/lib/queries";
import { CATEGORY_LABELS } from "@/sanity/lib/categories";
import Hero from "../../_components/hero";
import { photos } from "../../_data/about-content";

// how each kind of sanity rich text block gets rendered
// spacing between blocks comes from space-y on the wrapper, so none of these need margins
const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-neutral-700 sm:text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="pt-4 text-2xl font-bold text-neutral-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-2 text-xl font-semibold text-neutral-900">{children}</h3>
    ),
    // gold left border to match the gold bottom border on the cards
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-l-(--gold) pl-5 text-lg italic text-neutral-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-neutral-700 marker:text-(--gold)">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-neutral-700 marker:text-(--gold)">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      // links to other sites open in a new tab, links within the site don't
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-medium text-neutral-900 underline decoration-(--gold) decoration-2 underline-offset-4 transition hover:decoration-neutral-900"
        >
          {children}
        </a>
      );
    },
  },
};

// pre-renders a page for every team member that exists at build time
// members added later still work since next renders unknown slugs on demand
export async function generateStaticParams() {
  const slugs = await client.fetch(TEAM_MEMBER_SLUGS_QUERY);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export default async function TeamMemberPage({
  // next matches the url against the [slug] folder and passes the match in as params.slug
  params,
}: {
  // params is a promise in next 15+, so it has to be awaited
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await client.fetch(TEAM_MEMBER_QUERY, { slug }, { next: { revalidate: 60 } });

  // a typo'd or deleted slug gets a real 404 instead of a crash
  if (!member) notFound();

  const categoryLabel = member.category ? CATEGORY_LABELS[member.category] : null;

  return (
    <>
      <div className="w-full bg-[#1b2a41] min-h-[60px] flex flex-1 items-center px-8">
          <Link
            href="/about/team"
            className="flex text-md font-medium text-white transition hover:text-gray-900"
          >
            ← Back to Our Team
          </Link>
      </div>
      {/* id matches the hero's nextId so its scroll-down button has a target */}
      <main id="members" className="min-h-250">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-8">

          {/* stacked on mobile, photo column + text column on desktop */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            {/* sticky keeps the photo in view while a long bio scrolls past */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative grid aspect-[3/4] place-items-center overflow-hidden border-b-[3px] border-solid border-b-(--gold) bg-(--off-white)">
                {member.photo ? (
                  <Image
                    // bigger than the card version since the photo displays larger here
                    src={urlFor(member.photo).width(900).height(1200).fit("crop").auto("format").url()}
                    alt={member.name}
                    fill
                    // about a third of the page on desktop, full width on mobile
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                    // this is the main image on the page, so load it right away
                    priority
                  />
                ) : (
                  <span className="text-6xl font-semibold text-neutral-400">
                    {member.name.split(" ").map((p: string) => p[0]).slice(0, 2).join("")}
                  </span>
                )}
              </div>
            </aside>

            <article>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                {member.name}
              </h1>
              {(categoryLabel || member.role) && (
                <p className="mt-3 text-lg text-neutral-600">
                  {categoryLabel}
                  {categoryLabel && member.role ? " - " : ""}
                  {member.role}
                </p>
              )}

              {/* short gold bar, same visual language as the card border */}
              <div className="mt-6 h-[3px] w-16 bg-(--gold)" />

              {/* max-w-prose keeps lines around 65 characters, which is the comfortable reading width */}
              <div className="mt-8 max-w-prose space-y-5">
                {member.bio ? (
                  <PortableText value={member.bio} components={bioComponents} />
                ) : (
                  <p className="italic text-neutral-500">Bio coming soon.</p>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}