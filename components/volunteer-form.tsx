import { Button } from "@/components/ui/button";
import { volunteerForm } from "@/lib/site";

/** Uses the Council's Google Form to collect volunteer responses. */
export default function VolunteerForm() {
    return (
        <div className="min-w-0 space-y-6">
            <div className="border-y border-[#d9d7d1] bg-white p-6">
                <p className="text-sm text-muted-foreground">
                    If the embedded form does not work in your browser, open the volunteer form directly in Google Forms.
                </p>
                <Button asChild className="mt-4 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center sm:w-auto">
                    <a href={volunteerForm.hosted} target="_blank" rel="noopener noreferrer">
                        Open volunteer form in a new tab
                    </a>
                </Button>
            </div>

            <div className="overflow-auto border border-[#d9d7d1] bg-white">
                <iframe
                    title="World Affairs Council Hilton Head volunteer form"
                    src={volunteerForm.embedded}
                    className="h-[1150px] w-full border-0 sm:h-[1050px]"
                />
            </div>
        </div>
    );
}
