import Image from "next/image";

export default function Testimonial({ quote, name, role, photo }: { quote: string; name: string; role: string; photo: string }) {
    return (
        <figure className="grid items-center gap-10 md:grid-cols-[240px_1fr]">
            <Image src={ photo } alt={ name } width={ 240 } height={ 240 } className="mx-auto aspect-square rounded-full object-cover" />
            <div>
                <blockquote className="font-serif text-2xl leading-relaxed text-primary md:text-[1.7rem]">“{ quote }”</blockquote>
                <figcaption className="mt-5 text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                    <span className="text-gold">—</span> { name }, { role }
                </figcaption>
            </div>
        </figure>
    );
}
