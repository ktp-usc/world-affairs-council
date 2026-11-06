"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { field, label } from "@/lib/form";
import { giving, parseDate, sponsorship } from "@/lib/site";

const short = (iso: string) => parseDate(iso).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });

// No backend yet: submitting opens the visitor's email app with the form filled in.
export default function SponsorForm() {
    const [level, setLevel] = useState(sponsorship.levels[0].id);
    const [sent, setSent] = useState(false);
    const chosen = sponsorship.levels.find((l) => l.id === level)!;

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const prefs = [1, 2, 3].map((n) => data.get(`choice${ n }`)).filter(Boolean);
        const body = [
            `Name: ${ data.get("name") }`,
            `Email: ${ data.get("email") }`,
            `Phone: ${ data.get("phone") || "—" }`,
            `Sponsorship level: ${ chosen.name } ($${ chosen.amount })`,
            `Speaker preferences: ${ prefs.map((p, i) => `${ i + 1 }. ${ p }`).join("; ") }`,
            `Total payment: $${ data.get("total") || chosen.amount }`,
            "",
            `Sponsorship comment: ${ data.get("comment") || "—" }`,
        ].join("\n");
        window.location.href = `mailto:${ sponsorship.email }?subject=${ encodeURIComponent("Speaker Sponsorship") }&body=${ encodeURIComponent(body) }`;
        setSent(true);
    }

    return (
        <form onSubmit={ onSubmit } className="rounded-xl border bg-card p-7 shadow-sm">
            <fieldset>
                <legend className={ label }>Sponsorship level</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                    { sponsorship.levels.map((l) => (
                        <label key={ l.id } className="cursor-pointer rounded-lg border p-4 hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                            <input type="radio" name="level" value={ l.id } checked={ level === l.id } onChange={ () => setLevel(l.id) } className="sr-only" />
                            <span className="block font-serif text-2xl font-semibold text-primary">${ l.amount.toLocaleString() }</span>
                            <span className="text-sm font-medium">{ l.name.replace(" Sponsorship", "") }</span>
                        </label>
                    )) }
                </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div className="sm:col-span-3">
                    <p className={ label }>Speaker preferences <span className="font-normal text-muted-foreground">(rank in case slots are already taken)</span></p>
                </div>
                { [1, 2, 3].map((n) => (
                    <div key={ n }>
                        <label htmlFor={ `sf-choice${ n }` } className="mb-1.5 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            { ["1st", "2nd", "3rd"][n - 1] } choice
                        </label>
                        <select id={ `sf-choice${ n }` } name={ `choice${ n }` } required={ n === 1 } defaultValue="" className={ field }>
                            <option value="">{ n === 1 ? "Select a speaker" : "Optional" }</option>
                            { sponsorship.presentations.map((p) => (
                                <option key={ p.date } value={ `${ short(p.date) } – ${ p.presenter }` }>{ short(p.date) } – { p.presenter }</option>
                            )) }
                        </select>
                    </div>
                )) }
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="sf-name" className={ label }>Name</label>
                    <input id="sf-name" name="name" required autoComplete="name" className={ field } />
                </div>
                <div>
                    <label htmlFor="sf-email" className={ label }>Email</label>
                    <input id="sf-email" name="email" type="email" required autoComplete="email" className={ field } />
                </div>
                <div>
                    <label htmlFor="sf-phone" className={ label }>Phone <span className="text-muted-foreground">(optional)</span></label>
                    <input id="sf-phone" name="phone" type="tel" autoComplete="tel" className={ field } />
                </div>
                <div>
                    <label htmlFor="sf-total" className={ label }>Total payment ($)</label>
                    <input id="sf-total" name="total" type="number" min={ chosen.amount } step={ 1 } placeholder={ String(chosen.amount) } className={ field } />
                </div>
            </div>

            <div className="mt-6">
                <label htmlFor="sf-comment" className={ label }>Sponsorship comment</label>
                <textarea id="sf-comment" name="comment" rows={ 3 } placeholder="Sponsoring more than one presentation? List them here." className={ field } />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg">Submit sponsorship — ${ chosen.amount.toLocaleString() }</Button>
                { sent && (
                    <p className="text-sm text-muted-foreground" role="status">
                        Your email app should open with the form filled in. To pay online, use our{ " " }
                        <a href={ giving.donateOnline } className="font-medium text-primary underline">online donation form</a>, or email{ " " }
                        <a href={ `mailto:${ sponsorship.email }` } className="font-medium text-primary underline">{ sponsorship.email }</a>.
                    </p>
                ) }
            </div>
        </form>
    );
}
