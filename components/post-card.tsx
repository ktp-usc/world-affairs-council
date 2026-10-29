import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Post, formatPostDate } from "@/lib/site";

export default function PostCard({ post }: { post: Post }) {
    return (
        <article className="flex flex-col rounded-xl border bg-card p-7 shadow-sm transition hover:shadow-md">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 font-medium text-secondary-foreground">
                    { post.category }
                </span>
                <time dateTime={ post.date }>{ formatPostDate(post) }</time>
                { post.author && <span>· { post.author }</span> }
            </div>
            <h3 className="font-serif text-2xl leading-snug font-semibold text-primary">
                <Link href={ `/news/${ post.slug }` } className="hover:underline">{ post.title }</Link>
            </h3>
            <p className="mt-3 mb-5 line-clamp-3 flex-1 text-muted-foreground">{ post.body.join(" ") }</p>
            <Link href={ `/news/${ post.slug }` } className="inline-flex items-center gap-1 self-start text-sm font-semibold text-primary hover:text-gold">
                Read more <ArrowRight className="size-4" />
            </Link>
        </article>
    );
}
