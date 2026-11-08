import { Button } from "@/components/ui/button";
import WildApricotEmbed from "@/components/wild-apricot-embed";
import { membership } from "@/lib/site";

/** Embeds Wild Apricot signup while retaining the direct hosted-form fallback. */
export default function WildApricotSignup() {
    return (
        <div className="space-y-6">
            <div className="border-y border-[#d9d7d1] bg-white py-6">
                <h2 className="font-[family-name:var(--serif)] text-[28px] font-medium text-[var(--navy)]">
                    Membership application
                </h2>

                <p className="mt-2 text-[#505050]">
                    Complete your application below. Wild Apricot handles
                    your membership details and payment.
                </p>

                <p className="mt-3 text-sm text-[#505050]">
                    If the embedded form does not work in your browser,
                    open the membership form directly on Wild Apricot.
                </p>

                <Button asChild className="mt-4 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center sm:w-auto">
                    <a
                        href={membership.hostedJoin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open membership form in a new tab
                    </a>
                </Button>
            </div>

            <WildApricotEmbed
                title="World Affairs Council Hilton Head membership application"
                src={membership.widgetJoin}
            />
        </div>
    );
}
