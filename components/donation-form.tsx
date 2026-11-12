"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import WildApricotEmbed from "@/components/wild-apricot-embed";
import { giving } from "@/lib/site";

const forms = [
    { label: "Individual donations", hosted: giving.hostedDonate, widget: giving.widgetDonate, note: "Enter your contact details and donation amount in the form below." },
    { label: "Student Program Fund", hosted: giving.hostedStudent, widget: giving.widgetStudent, note: "Select Student Program Support as your Individual Donation Type to direct your gift to student programs." },
    { label: "Monthly giving", hosted: giving.hostedMonthly, widget: giving.widgetMonthly, note: "Choose Monthly under Payment Frequency to set up a recurring gift." },
];

/** Mount only one Wild Apricot form at a time. */
export default function DonationForm() {
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        const selectFromHash = () => {
            if (window.location.hash === "#student-donation-form") setSelected(1);
            else if (window.location.hash === "#monthly-donation-form") setSelected(2);
            else if (window.location.hash === "#donation-form") setSelected(0);
        };
        selectFromHash();
        window.addEventListener("hashchange", selectFromHash);
        return () => window.removeEventListener("hashchange", selectFromHash);
    }, []);
    const form = forms[selected];
    return (
        <div className="space-y-6">
            <span id="student-donation-form" className="block scroll-mt-6" />
            <span id="monthly-donation-form" className="block scroll-mt-6" />
            <div className="flex flex-wrap gap-3" role="group" aria-label="Choose a donation form">
                {forms.map((item, index) => (
                    <Button key={item.label} type="button" variant={selected === index ? "default" : "outline"} aria-pressed={selected === index} onClick={() => setSelected(index)} className="h-auto whitespace-normal py-3">{item.label}</Button>
                ))}
            </div>
            <p className="text-muted-foreground" aria-live="polite">{form.note}</p>
            <Button asChild size="lg" className="h-auto min-h-14 w-full whitespace-normal px-8 py-4 text-center text-lg sm:w-auto">
                <a href={form.hosted} target="_blank" rel="noopener noreferrer">Open donation form in a new tab</a>
            </Button>
            <WildApricotEmbed key={form.widget} title={"World Affairs Council Hilton Head " + form.label.toLowerCase() + " form"} src={form.widget} />
        </div>
    );
}
