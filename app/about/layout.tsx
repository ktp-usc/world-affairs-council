import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="site-shell">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
