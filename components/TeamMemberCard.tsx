import Image from 'next/image'
import Link from 'next/link'
import { urlFor, type SanityImage } from '@/sanity/lib/image'

export type TeamMemberCardData = {
  _id: string
  name: string
  slug: string
  role?: string
  category?: string
  photo?: SanityImage
}

export function TeamMemberCard({ member }: { member: TeamMemberCardData }) {
  // fallback when there's no photo, "jane doe" becomes "JD"
  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <Link
      href={`/about/team/${member.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--gold)"
    >
      <div className="relative grid aspect-[3/4] place-items-center overflow-hidden border-b-[3px] border-solid border-b-(--gold) bg-(--off-white)">
        {member.photo ? (
          <Image
            // 600x800 is 3:4, so sanity crops to the same shape as the box and respects the hotspot
            src={urlFor(member.photo).width(600).height(800).fit('crop').auto('format').url()}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          // place-items-center is what centers the initials in the box
          <span className="text-4xl font-semibold text-neutral-400">{initials}</span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="font-bold text-neutral-900">{member.name}</h3>
        {member.role && <p className="text-sm text-neutral-600 font-bold">{member.role}</p>}
      </div>
    </Link>
  )
}