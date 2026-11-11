/** Wraps every About page in the shared page shell. */
export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="site-shell">
            <main className="bg-white">{children}</main>
        </div>
    );
}
