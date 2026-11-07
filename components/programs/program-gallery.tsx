import Image from "next/image";

type GalleryImage = { src: string; alt: string };

export default function ProgramGallery({ images, title }: { images: GalleryImage[]; title: string }) {
    return (
        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18" aria-labelledby="program-gallery-title">
            <h2 id="program-gallery-title" className="font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">{title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {images.map((image) => (
                    <figure className="relative aspect-[4/3] overflow-hidden bg-[#e8e6e0]" key={image.src}>
                        <Image className="object-cover" src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 50vw" />
                    </figure>
                ))}
            </div>
        </section>
    );
}
