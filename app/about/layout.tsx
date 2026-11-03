import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutTabs from "./_components/about-tabs";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="site-shell">
            <Header />
            <AboutTabs />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
