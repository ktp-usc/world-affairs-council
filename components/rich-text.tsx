import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";

const linkStyle = "font-bold text-[var(--teal)] underline underline-offset-4 transition-[color] duration-150 hover:text-[var(--navy)]";

/** The renderer for each kind of block editors can add in rich text fields (see sanity/schemaTypes/richText.ts). */
function richTextComponents(paragraphClassName: string): PortableTextComponents {
    return {
        block: {
            normal: ({ children }) => <p className={paragraphClassName}>{children}</p>,
            h3: ({ children }) => <h3 className="m-0 pt-2 font-[family-name:var(--serif)] text-[24px] leading-[1.25] font-medium text-[var(--navy)]">{children}</h3>,
            h4: ({ children }) => <h4 className="m-0 pt-1 text-[19px] font-bold text-[var(--navy)]">{children}</h4>,
            blockquote: ({ children }) => <blockquote className="m-0 border-l-[3px] border-l-[var(--gold)] pl-5 italic">{children}</blockquote>,
        },
        list: {
            bullet: ({ children }) => <ul className="m-0 list-disc space-y-2 pl-6">{children}</ul>,
            number: ({ children }) => <ol className="m-0 list-decimal space-y-2 pl-6">{children}</ol>,
        },
        listItem: {
            bullet: ({ children }) => <li className="pl-1">{children}</li>,
            number: ({ children }) => <li className="pl-1">{children}</li>,
        },
        marks: {
            link: ({ value, children }) => {
                const href: string = value?.href ?? "#";
                // links to other sites open in a new tab, links within the site don't
                const external = /^https?:\/\//.test(href);
                return (
                    <a className={linkStyle} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                        {children}
                    </a>
                );
            },
        },
    };
}

/**
 * Rich text written by editors in Sanity.
 * `className` styles the wrapper (spacing between blocks, text color) and `paragraphClassName` styles each paragraph.
 */
export default function RichText({ value, className = "space-y-4", paragraphClassName = "m-0" }: { value: PortableTextBlock[]; className?: string; paragraphClassName?: string }) {
    return (
        <div className={className}>
            <PortableText value={value} components={richTextComponents(paragraphClassName)} />
        </div>
    );
}
