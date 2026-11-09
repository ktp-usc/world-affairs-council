import { Button } from "@/components/ui/button";
import WildApricotEmbed from "@/components/wild-apricot-embed";
import { giving } from "@/lib/site";

/** Embeds the donation form with a direct link for browsers that block cookies. */
export default function DonationForm() {
    return (
        <div className="space-y-6">
            <Button asChild size="lg" className="h-auto min-h-14 w-full whitespace-normal px-8 py-4 text-center text-lg sm:w-auto">
                <a href={giving.hostedDonate} target="_blank" rel="noopener noreferrer">
                    Open donation form in a new tab
                </a>
            </Button>

            <WildApricotEmbed
                title="World Affairs Council Hilton Head online donation form"
                src={giving.widgetDonate}
            />
        </div>
    );
}
