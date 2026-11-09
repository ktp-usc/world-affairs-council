import { Button } from "@/components/ui/button";
import WildApricotEmbed from "@/components/wild-apricot-embed";
import { sponsorship } from "@/lib/site";

export default function SponsorForm() {
    return (
        <div className="space-y-6">
            <p className="text-muted-foreground">Complete your sponsorship and payment using the Council’s form. Scroll within the form to see all fields. If the form does not load, open it in a new tab.</p>
            <Button asChild size="lg" className="h-auto whitespace-normal py-3">
                <a href={sponsorship.hostedForm} target="_blank" rel="noopener noreferrer">Open sponsorship form in a new tab</a>
            </Button>
            <WildApricotEmbed title="WACHH speaker sponsorship donation form" src={sponsorship.widgetForm} iframeClassName="h-[800px] w-full border-0" />
        </div>
    );
}
