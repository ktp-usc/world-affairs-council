"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { field, label } from "@/lib/form";
import { volunteerContact, volunteerRoles } from "@/lib/site";

// No backend yet: submitting opens the visitor's email app with the form filled in.
export default function VolunteerForm() {
    const [sent, setSent] = useState(false);

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const interests = data.getAll("interests").join(", ") || "Not sure yet";
        const body = [
            `Name: ${ data.get("name") }`,
            `Email: ${ data.get("email") }`,
            `Phone: ${ data.get("phone") || "—" }`,
            `Member: ${ data.get("member") }`,
            `Interested in: ${ interests }`,
            `Availability: ${ data.get("availability") || "—" }`,
            "",
            `${ data.get("message") || "" }`,
        ].join("\n");
        window.location.href = `mailto:${ volunteerContact.email }?subject=${ encodeURIComponent("Volunteer Form") }&body=${ encodeURIComponent(body) }`;
        setSent(true);
    }

    return (
        <form onSubmit={ onSubmit } className="rounded-xl border bg-card p-7 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="vf-name" className={ label }>Name</label>
                    <input id="vf-name" name="name" required autoComplete="name" className={ field } />
                </div>
                <div>
                    <label htmlFor="vf-email" className={ label }>Email</label>
                    <input id="vf-email" name="email" type="email" required autoComplete="email" className={ field } />
                </div>
                <div>
                    <label htmlFor="vf-phone" className={ label }>Phone <span className="text-muted-foreground">(optional)</span></label>
                    <input id="vf-phone" name="phone" type="tel" autoComplete="tel" className={ field } />
                </div>
                <div>
                    <label htmlFor="vf-member" className={ label }>Are you a WACHH member?</label>
                    <select id="vf-member" name="member" className={ field } defaultValue="Yes">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>
            </div>

            <fieldset className="mt-6">
                <legend className={ label }>I’m interested in</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                    { volunteerRoles.map((r) => (
                        <label key={ r.id } className="flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-secondary">
                            <input type="checkbox" name="interests" value={ r.title } className="size-4 accent-primary" />
                            { r.title }
                        </label>
                    )) }
                </div>
            </fieldset>

            <div className="mt-6">
                <label htmlFor="vf-availability" className={ label }>Availability <span className="text-muted-foreground">(optional)</span></label>
                <input id="vf-availability" name="availability" placeholder="e.g. Friday mornings, a few times a season" className={ field } />
            </div>
            <div className="mt-6">
                <label htmlFor="vf-message" className={ label }>Tell us about yourself <span className="text-muted-foreground">(optional)</span></label>
                <textarea id="vf-message" name="message" rows={ 4 } className={ field } />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg">Send Volunteer Form</Button>
                { sent && (
                    <p className="text-sm text-muted-foreground" role="status">
                        Your email app should open with the form filled in. If it didn’t, email us at{ " " }
                        <a href={ `mailto:${ volunteerContact.email }` } className="font-medium text-primary underline">{ volunteerContact.email }</a>.
                    </p>
                ) }
            </div>
        </form>
    );
}
