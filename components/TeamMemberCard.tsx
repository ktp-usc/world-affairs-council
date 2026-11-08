/*
// components/TeamMemberCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor, type SanityImage } from '@/sanity/lib/image'
import { CATEGORY_LABELS } from '../sanity/lib/categories'

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

  const categoryLabel = member.category ? CATEGORY_LABELS[member.category] : null

  return (
    // the whole card is the link, so the click target is big and keyboard users can tab to it
    <Link
      href={`/sanity-test/${member.slug}`}
      className="group block rounded-2xl border border-neutral-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 max-h-[20%] max-w-[20%] min-w-[20%]"
    >
      {/* fixed square so cards line up even when the photos are different sizes }
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
        {member.photo ? (
          <Image
            // width + height + crop respects the hotspot editors set in the studio
            src={urlFor(member.photo).width(600).height(600).fit('crop').auto('format').url()}
            alt={member.name}
            fill
            // tells the browser how wide the card is at each breakpoint so it picks the right size
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl font-semibold text-neutral-400">
            {initials}
          </div>
        )}
      </div>

      <div className="mt-4">
        {categoryLabel && (
          <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
            {categoryLabel}
          </span>
        )}
        <h3 className="mt-2 text-lg font-semibold text-neutral-900">{member.name}</h3>
        {member.role && <p className="text-sm text-neutral-600">{member.role}</p>}
      </div>
    </Link>
  )
} */

// components/TeamMemberCard.tsx
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
      {/* the photo box from your css, relative + overflow-hidden added so the image fills it cleanly */}
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
        {member.role && <p className="text-sm text-neutral-600">{member.role}</p>}
      </div>
    </Link>
  )
}