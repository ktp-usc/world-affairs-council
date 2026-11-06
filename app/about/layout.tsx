import AboutTabs from "./_components/about-tabs";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="site-shell">
            <AboutTabs />
            <main className="bg-white">{children}</main>
        </div>
    );
}
