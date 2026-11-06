import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { TEAM_MEMBER_QUERY, TEAM_MEMBER_SLUGS_QUERY } from '@/sanity/lib/queries'

// pre-renders a page for every admin that exists at build time
// admins added later still work since next renders unknown slugs on demand
export async function generateStaticParams() {
  const slugs = await client.fetch(TEAM_MEMBER_SLUGS_QUERY)
  return slugs.map((s: { slug: string}) => ({ slug: s.slug }))
}

export default async function AdminPage({
    // params is where the slug comes from
    // react sees the url /sanity-test/jane-doe, and matches it with /sanity-test/[slug], so slug becomes jane-doe
  params,
}: {
  // params is a promise in next 15+, so it has to be awaited
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const admin = await client.fetch(TEAM_MEMBER_QUERY, { slug }, { next: { revalidate: 60 } })

  // a typo'd or deleted slug gets a real 404 instead of a crash
  if (!admin) notFound()

  return (
    <main>
      <h1>{admin.name}</h1>
      <p>{admin.role}</p>
      {/* portable text turns sanity rich text blocks into html */}
      {admin.bio && <PortableText value={admin.bio} />}
    </main>
  )
}