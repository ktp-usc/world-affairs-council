import Image from "next/image";

export default function MemberStory({ photo, name, role, children }: { photo: string; name: string; role: string; children: React.ReactNode }) {
    return (
        <figure className="grid items-start gap-6 border-l-4 border-gold pl-6 sm:grid-cols-[112px_1fr]">
            <Image src={photo} alt={name} width={112} height={112} className="aspect-square rounded-full object-cover" />
            <div><blockquote className="space-y-4 text-lg leading-relaxed text-muted-foreground">{children}</blockquote><figcaption className="mt-5 font-semibold text-primary">{name}<span className="block text-sm font-normal text-muted-foreground">{role}</span></figcaption></div>
        </figure>
    );
}
