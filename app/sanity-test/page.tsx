// app/admin/page.tsx
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { TEAM_MEMBERS_QUERY } from '@/sanity/lib/queries'
import { TeamMemberCard, type TeamMemberCardData } from '@/components/TeamMemberCard'



export default async function AdminsPage() {
  // refetch at most once a minute so new admins show up without a redeploy
  const team_members = await client.fetch(TEAM_MEMBERS_QUERY, {}, { next: { revalidate: 60 } })

  return (
    <main>
      {team_members.map((team_member: TeamMemberCardData) => (
        // the slug from sanity becomes the url
        <Link key={team_member._id} href={`/admin/${team_member.slug}`}>
          <TeamMemberCard member={team_member} />
        </Link>
      ))}
    </main>
  )
}